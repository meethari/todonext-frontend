import axios from "axios"
function getListActions(lists, setLists, selectedListId, setSelectedListId) {

    const deleteListFromLists = (id) => {
        console.log(`deleteList: ${id}`)
    }
    
    const addListToLists = (newList) => {
        console.log(newList)
    }
    

    return {addListToLists, deleteListFromLists};
    
    
}

export default getListActions;