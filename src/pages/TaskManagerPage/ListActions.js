import Api from 'utilities/api'

function getListActions({lists, setLists, selectedListId, setSelectedListId, selectList, api}) {

    const deleteListFromLists = async (id) => {
        console.log('Hit delete')
        console.log(`deleteId ${id}`)
        const deleteIdx = lists.findIndex(list => list._id == id)
        console.log(`deleteIdx ${deleteIdx}`)
        if (deleteIdx == -1) {
            throw console.error(`deleteListFromLists: ${id} doesn't exist`);
        } 

        if (id == selectedListId) {
            // we need to change the selected item to something else

            // if deleted is the first element, second should be selected
            if (deleteIdx == 0) {
                if (lists.length > 1) {
                    selectList(lists[1]._id)
                }
            } else {
                // else previous should be selected
                selectList(lists[deleteIdx - 1]._id)
            }
            
        }

        if (lists.length == 1) {
            // if none available to select, then set selectedListId to no lists
            setSelectedListId("no lists")
            // this should get the UI to print an appropriate message
        }

        // ultimately remove the deleted from lists
        setLists([...lists.slice(0, deleteIdx), ...lists.slice(deleteIdx + 1)])

        // since deleting takes time, we make the api call at the end
        await api.delete(`/api/lists/${id}`)
    }
    
    const addListToLists = async (newList) => {
        const response = await api.post('/api/lists/', newList)
        setLists([...lists, response.data])
        selectList(response.data._id)

        if (response.status == 404) {
            throw 'add list did not work'
        }
    }
    

    return {addListToLists, deleteListFromLists};
    
    
}

export default getListActions;