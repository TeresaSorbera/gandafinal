import axios from 'axios';

class ConferencesDelete {

    deleteConference(id) {
        axios.get('http://localhost:6001/conferences/delete/' + id)
            .then(() => {
                console.log('Conference Deleted !!!')
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export default ConferencesDelete;
