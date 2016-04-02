tpl = ''

$.map(data, function(_item){
  tpl += '<tr>' +
            '<td>' + _item.title + '</td>' +
            '<td>' + _item.name + '</td>' +
          '</tr>'
})

$('#test').html('<table>'+tpl+'</table>')

$.ajax({
  type: 'post',
  url: 'tstst.php',
  data:{
    id: 111
  },
  dataType: 'json',
  success: function(data){
    tpl = ''

$.map(data, function(_item){
  tpl += '<tr>' +
            '<td>' + _item.title + '</td>' +
            '<td>' + _item.name + '</td>' +
          '</tr>'
})

$('#test').html('<table>'+tpl+'</table>')
  }
})

// <table width="200" border="1" cellspacing="0" cellpadding="0">
//   <tr>
//     <th scope="col">&nbsp;</th>
//     <th scope="col">&nbsp;</th>
//   </tr>
//   <tr>
//     <td>&nbsp;</td>
//     <td>&nbsp;</td>
//   </tr>
//   <tr>
//     <td>&nbsp;</td>
//     <td>&nbsp;</td>
//   </tr>
// </table>
// 

