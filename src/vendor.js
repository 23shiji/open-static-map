import $ from 'jquery'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css'
// import 'bootstrap/dist/js/bootstrap'
// import 'bootstrap-material-design/dist/js/bootstrap-material-design'

// $(document).ready(function() {
//   $('body').bootstrapMaterialDesign();
// });

import 'materialize-css/dist/js/materialize.js'
import 'materialize-css/sass/materialize.scss'
import 'webpack-material-design-icons'
alert(233);
$(document).ready(function() {
  $('select').material_select();
  $('.drawer-btn').sideNav({
    menuWidth:    300, // Default is 300
    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable:    true, // Choose whether you can drag to open on touch screens,
  })
  alert("FUCK")
});
