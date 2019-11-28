import axios from 'axios';

class MathematiciansDelete {

    deleteMathematician(id) {
        axios.get('http://localhost:6001/mathematicians/delete/' + id)
            .then(() => {
                console.log('Mathematician Deleted !!!')
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export default MathematiciansDelete;
