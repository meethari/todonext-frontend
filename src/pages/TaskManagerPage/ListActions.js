function getListActions(lists, setLists, selectedListId, setSelectedListId) {

    const initLists = () => {
    }

    const deleteListFromLists = (id) => {
        console.log(`deleteList: ${id}`)
    }
    
    const addListToLists = (newList) => {
        console.log(newList)
    }
    
    const selectList = (id) => {
        setSelectedListId(id)
    }

    return {initLists, addListToLists, deleteListFromLists, selectList};
    
    
}

export default getListActions;