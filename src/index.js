var index = -1;

var items = localStorage.getItem("items");
items = JSON.parse(items);

const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}
        
if(items == null) items = [];
      
function list(){
    document.getElementById("list").innerHTML="";
    var table = "";
    var total = tItems = 0;
            
    for(var i in items){
        var item = JSON.parse(items[i]);
        total += item.price;   
        tItems++;     
        table += "<tr><td>"+item.item+"</td>";
        table += "<td>$"+item.price+"</td>";
        table += '<td><button onClick="deleteItem(' + i + ')" class="btn btn-outline-danger">';
        table += '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">';
        table += '<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>';
        table += '</svg></button></td></tr>';
    }
    table += "<tr><td class='bg-color3'>Total items: " + tItems + "</td>";   
    table += "<td class='bg-color3'>Total price: $"+ total +"</td>";
    table += "<td class='bg-color3'></td></tr>";    
    document.getElementById("list").innerHTML = table;
}
        
function addToCart(num, price){
    var item = "";
    switch (num) {
        case 1:
            item = "Sailor Moon's Lunar Scepter";
            break;
        case 2:
            item = "Chika Fujiwara's Bunny Ears";
            break;
        case 3:
            item = "Ash Ketchup's Hat";
            break;
        case 4:
            item = "Riri's Magic Wand";
            break;
        case 5:
            item = "Yumiella Dollkness' Wood Sword";
            break;
        case 6:
            item = "Shoyo Hinata's Volleyball Ball";
            break;
        default:
            break;
    }

    var item = JSON.stringify({ 
        item: item, 
        price: price
    });
             
    items.push(item);
    localStorage.setItem("items" , JSON.stringify(items));
    Swal.fire({
        title: "Keep it up!",
        text: "Item added successfully",
        icon: "success"
    });
    list();
}

function deleteItem(i) {
    index = i;
    var item = JSON.parse(items[index]);
    var itemName = item.item;
    Swal.fire({
        title: "Are you sure you want to delete " + itemName + "?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            items.splice(index, 1);
            localStorage.setItem("items", JSON.stringify(items));
            list();
            appendAlert('The item has been deleted!', 'danger')
        }
    });
}
        
window.onload = list;