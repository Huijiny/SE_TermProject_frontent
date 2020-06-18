
const customerName = document.getElementById('txt1_cus');
const customerBirth = document.getElementById('birth_cus');
const customerPhoneNo = document.getElementById('phone_cus');
const consultationDate = document.getElementById('now_date_cus');
const type_T = document.getElementById('treatment_cus');
const type_B = document.getElementById('beauty_cus');
const counselor = document.getElementById('txt6_cus');
const title = document.getElementById('txt7_cus');
const content = document.getElementById('txt8_cus');
var customerID;

function addConsultation(evt){
    evt.preventDefault();
    alert("sdf");
    db.collection("Customer")
    .where("customerName","==",customerName.value)
    .where("customerBirth","==",customerBirth.value)
    .where("customerPhoneNo","==",customerPhoneNo.value)
    .get()
    .then(function (querySnapshot){
       querySnapshot.forEach(function (doc){
            data = doc.data();
            alert(doc.ref.id);
            var postData={
                customerName: customerName.value,
                customerBirth: customerBirth.value,
                customerPhone: customerPhoneNo.value,
                customerId:doc.ref.id,
                consultationDate: consultationDate.value,
                type: {
                    treatment:type_T.checked,
                    beauty:type_B.checked
                },
                counselor: counselor.value,
                title: title.value,
                content: content.value
            };
        
            db.collection("History")
            .add(postData)
            .then(function(docRef) {
                alert("successfully added");
                console.log('Added document withID: ',docRef.id );
                allClear();
            })
            .catch(function(error){
                alert("Error adding document: ",error);
            });
            console.log(customerBirth.value,customerName.value,consultationDate.value,type_B.checked,type_T.checked,counselor.value,title.value,content.value);
        })
    })
    .catch(function(error){
        alert("error");
    });
    

}
function customerList(id,number,name,birth,phone){
    let tmp_html = `<tr id="${id}" class="tdcls">\
        <td>${number}</td>\
        <td>${name}</td>\
        <td>${birth}</td>\
        <td>${phone}</td>\
    </tr>`;
    $("#customer-lists").append(tmp_html);
    
}
function HistoryList(id,number,title,date){
    let tmp_html = `<tr id="${id}">\
        <td>${number}</td>\
        <td>${title}</td>\
        <td>${date}</td>\
    </tr>`;
    $("#history-lists").append(tmp_html);
    
}
function searchCustomer(){
    $("#customer-lists").html("");
    var index=0;
    var name = $("#search-name").val();
    var birth = $("#search-birth").val();
    
    db.collection("Customer").where("customerName","==",name).where("customerBirth","==",birth).get()
    .then(function (querySnapshot){
       querySnapshot.forEach(function (doc){
            data = doc.data();
            customerList(doc.ref.id,++index,data["customerName"],data["customerBirth"],data["customerPhoneNo"]);
       })
       $("#search-name").val("");
       $("#search-birth").val("");
    })
    .catch(function(error){
        alert(error);
    });
}

function allClear(){
    $('#txt1_cus').val("");
    $('#birth_cus').val("");
    $('#phone_cus').val("");
    $('#now_date_cus').val("");
    $('#treatment_cus').val("");
    $('#beauty_cus').val("");
    $('#txt6_cus').val("");
    $('#txt7_cus').val("");
    $('#txt8_cus').val("");
}

$("#customer-lists").on("click", "tr", function() { 
    
    var id = $(this).attr('id');
    customerID = id;
    alert(id);
    db.collection("History").where("customerId","==",id).get()
    .then(function (querySnapshot){
        var index=0;
        querySnapshot.forEach(function (doc){
             data = doc.data();
             HistoryList(doc.ref.id,++index,data["title"],data["consultationDate"]);
        })

     })
     .catch(function(error){
         alert(error);
     });
});

$("#history-lists").on("click", "tr", function() { 
    var id = $(this).attr('id');
    alert(id);
});

window.onload = function () {
    document.getElementById('add-consultation-btn').addEventListener('click', addConsultation,false);
    document.getElementById('search-btn').addEventListener('click', searchCustomer,false);
}

var db = firebase.firestore();