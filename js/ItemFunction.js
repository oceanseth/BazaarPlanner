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