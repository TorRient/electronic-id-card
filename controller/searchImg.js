var axios = require('axios')
var fs = require('fs')

exports.searchImg = function (req, res) {
    data = fs.readFileSync(req.file.path, { encoding: 'base64' });
    axios.post('http://0.0.0.0:5000/searchImg', {
        data: data
    })
        .then(function (response) {
            name_of_nearest_faces = response.data['name_of_nearest_faces']
            image_nearest_faces = response.data['image_nearest_faces']
            acc_with_nearest_faces = response.data['acc_with_nearest_faces']
            res.render('admin/searchImg', {title: 'Search Image', root_image: data ,
                name_of_nearest_faces: name_of_nearest_faces, 
                image_nearest_faces: image_nearest_faces,
                acc_with_nearest_faces: acc_with_nearest_faces,
                condition : 1
            })
        })
        .catch(function (error) {
            ms = error.data['error']
            res.render('admin/searchImg', {title: 'Search Image', root_image: data, ms: ms})
        });
}