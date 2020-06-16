
const customerName = document.getElementById('name');
const customerBirth = document.getElementById('birth');
const customerPhoneNo = document.getElementById('contact-number');
const defaultval = 0;

function addCustomer(evt){
    evt.preventDefault();
    var postData={
        customerName: customerName.value,
        customerBirth: customerBirth.value,
        customerPhoneNo:customerPhoneNo.value,
        level:"SILVER",
        sell:defaultval,
        reservation:defaultval,
        consulting:defaultval,
        points:defaultval,
        coupons:defaultval
    };
    db.collection("Customer")
    .add(postData)
    .then(function(docRef) {
        alert("successfully added");
        console.log('Added document withID: ',docRef.id );
    })
    .catch(function(error){
        alert("Error adding document: ",error);
    });
    $('#name').val("");
    $("#birth").val("");
    $("#contact-number").val("");
}

function searchCustomer(){
    var name = $("#search-name").val();
    var birth = $("#search-birth").val();
    
    db.collection("Customer").where("customerName","==",name).where("customerBirth","==",birth).get()
    .then(function (querySnapshot){
       querySnapshot.forEach(function (doc){
           data = doc.data();
           $("#txt1").val(data["customerName"]);
           $("#txt2").val(data["customerBirth"]);
           $("#txt3").val(data["customerPhoneNo"]);
           $("#txt4").val(data["sell"]);
           $("#txt5").val(data["reservation"]);
           $("#txt6").val(data["consulting"]);
           $("#txt7").val(data["points"]);
           $("#txt8").val(data["coupons"]);
       })
       $("#search-name").val("");
       $("#search-birth").val("");
    })
    .catch(function(error){
        alert(error);
    });
}

function deleteCustomer(){
    var name = $("#txt1").val();
    var birth = $("#txt2").val();
    if(name||birth !== null){

        db.collection("Customer").where("customerName","==",name).where("customerBirth","==",birth).get()
        .then(function(querySnapshot){
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
                alert("successfully deleted");
                console.log("successfully deleted");
            });
        })
        .catch(function(error){
            alert(error);
        });
    }
    
}

function editCustomer() {
    if( document.getElementById("edit-customer-btn").innerText  == "완료"){
        document.getElementById("edit-customer-btn").innerText  = "EDIT";
        $('#txt1').readOnly = true ;
        $('#txt2').readOnly = true ;
        $('#txt3').readOnly = true ;
        $('#txt4').readOnly = true ;
        $('#txt5').readOnly = true ;
        $('#txt6').readOnly = true ;
        $('#txt7').readOnly = true ;
        $('#txt8').readOnly = true ;

        var name = $("#txt1").val();
        var birth = $("#txt2").val();

        db.collection("Customer").where("customerName","==",name).where("customerBirth","==",birth).get()
        .then(function(querySnapshot){
            querySnapshot.forEach(function (doc) {
                db.collection("Customer")
                .doc(doc.ref.id)
                .set({
                    customerName: $('#txt1').val(),
                    customerBirth: $('#txt2').val(),
                    customerPhoneNo:$('#txt3').val(),
                    level:"SILVER",
                    sell:$('#txt4').val(),
                    reservation:$('#txt5').val(),
                    consulting:$('#txt6').val(),
                    points:$('#txt7').val(),
                    coupons:$('#txt8').val()                   
                })
            });
            alert("successfully updated");
        })
        .catch(function(error){
            alert(error);
        });
  
    }
    else if( document.getElementById("edit-customer-btn").innerText  == "EDIT"){
        document.getElementById("edit-customer-btn").innerText  = "완료";
        document.getElementById("edit-customer-btn").background= "blue";
        $('#txt1').readOnly = false ;
        $('#txt2').readOnly = false ;
        $('#txt3').readOnly = false ;
        $('#txt4').readOnly = false ;
        $('#txt5').readOnly = false ;
        $('#txt6').readOnly = false ;
        $('#txt7').readOnly = false ;
        $('#txt8').readOnly = false ;

    }
}

window.onload = function () {
    document.getElementById('add-customer-btn').addEventListener('click', addCustomer,false);
    document.getElementById('search-btn').addEventListener('click', searchCustomer,false);
    document.getElementById('delete-customer-btn').addEventListener('click', deleteCustomer,false);
    document.getElementById('edit-customer-btn').addEventListener('click', editCustomer,false);
}

var db = firebase.firestore();