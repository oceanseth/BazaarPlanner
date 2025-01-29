class ItemFunction {
    static items = new Map();
}
ItemFunction.items.set("Flagship",(item)=>{
    return () => {
        let multicast = item.multicast || 0;
        item.board.items.forEach(i=>{
            if(i.id!=item.id && i.tags.some(tag => ["Tool", "Friend", "Property","Ammo"].includes(tag))) multicast++;
        });
        item.multicast = multicast;
        item.updateTriggerValuesElement();
        if(multicast>0) item.multicastElement.style.display = 'block';
    };
});
ItemFunction.items.set("Antimatter Chamber",(item)=>{
    //Destroy this and 3 small enemy items for the fight
    return () => {
        item.triggerFunctions.push(()=>{
            let smallEnemyItems = item.board.player.hostileTarget.board.items.filter(i=>i.tags.includes("Small"));
            let numItemsToDestroy = Math.min(3,smallEnemyItems.length);
            smallEnemyItems.sort(() => battleRandom() - 0.5).slice(0,numItemsToDestroy).forEach(i=>i.destroy());
            item.destroy();
        });
    };
});
