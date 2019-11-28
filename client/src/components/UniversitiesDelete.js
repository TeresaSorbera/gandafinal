import axios from 'axios';

class UniversitiesDelete {

    deleteUniversity(id) {
        axios.get('http://localhost:6001/universities/delete/' + id)
            .then(() => {
                console.log('University Deleted !!!')
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export default UniversitiesDelete;
