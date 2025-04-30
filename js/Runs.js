import { Run } from './Run.js';
export class Runs {
    static runs = {};
    static loadRuns() {
        Runs.loadActiveRuns();
        window.Runs = Runs;
        if(window.user==null) {
            $("#runs-content").html("<h1>Your Runs</h1><button onclick='window.showLogin()'>Login</button>");
            return;
        }
        if(document.getElementById("run-selector")!=null) {
            return;
        }
        
        // Create a query that excludes the encounters field by specifying the path
        const runsRef = firebase.database().ref("/users/"+user.uid+"/runs");
        
        // Get a list of run IDs first
        runsRef.orderByKey()
            .limitToLast(50)
            .once("value")
            .then((snapshot) => {
                let runIds = snapshot.val() ? Object.keys(snapshot.val()) : null;
                if(!runIds) {
                    $("#runs-content").html(`<h1>Your Runs</h1>
                        Your User has not tracked any runs yet.<br/><br/>
                        Download the tracker program <a href="${window.trackerUrl}">here</a> and start tracking your runs!<br/><br/>
                        This page will then look something like this:<br/><br/>
                        <img src="/images/faq-runs.png" style="width:50%;"/>
                        `);
                    return;
                }

                // Now fetch each run's metadata without encounters
                const runPromises = runIds.map(runId => 
                    firebase.database()
                        .ref(`/users/${user.uid}/runs/${runId}`)
                        .child('t')  // Only fetch the timestamp initially
                        .once('value')
                        .then(snap => ({
                            id: runId,
                            t: snap.val()?parseInt(snap.val()):null,
                            uid: user.uid
                        }))
                );

                return Promise.all(runPromises);
            })
            .then(runDataArray => {
                if (!runDataArray) return;
                runDataArray.sort((a, b) => b.t - a.t);
                runDataArray.forEach(runData => {
                    if(runData.t==null) return;
                    Runs.runs[runData.id] = new Run(runData);
                });
                
                // Create the select dropdown using Object.values to convert object to array
                const selectHtml = `
                    <select id="run-selector"><option value="null" disabled selected>Select a run</option>
                        ${Object.values(Runs.runs).map(run => 
                            `<option value="${run.id}">${(new Date(run.t)).toLocaleString()}</option>`
                        ).join('\n')}
                    </select>
                    <div id="selected-run-content"></div>
                `;
                
                $("#runs-content").html(`<h1>Your Runs</h1>`+selectHtml);
                
                // Update the change listener to use Runs.instance
                $("#run-selector").on('change', (e) => {
                    const selectedRun = Runs.runs[e.target.value];
                    if (selectedRun) {
                        selectedRun.loadData().then(
                            () => {                                
                                document.getElementById("selected-run-content").replaceChildren(selectedRun.element);
                                selectedRun.loadEncounter();
                            }
                        );                        
                    }
                });
            });
    }
    static loadActiveRuns() {
        User.activeUsers.then(users => {
            if(users.length==0) { return; }
            users.forEach(user => {
                
                const run = Runs.runs[user.id];
                if(run) {
                    run.loadData();
                }
            });
            $("#active-runs-content").html(`
                <h1>Active Runs</h1>
                <div class="active-runs-list">
                `
                + users.map(user => `<button class="follow-button" onClick="Runs.followUser('${user.id}')">${user.displayName}</button>`).join('') +
                `
                </div>
            `);
            
        });
    }
    static followUser(uid) {
        window.bottomPlayer.board.follow = uid;
        const followBtn = document.querySelector('#followBtn-b');
        followBtn.classList.add('following-button');
        followBtn.innerHTML = 'Unfollow';
        showSection('simulator');
    }
}

