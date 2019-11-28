import axios from 'axios';

class MembersDelete {

    deleteMember(id) {
        axios.get('http://localhost:6001/members/delete/' + id)
            .then(() => {
                console.log('Member Deleted !!!')
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export default MembersDelete;
