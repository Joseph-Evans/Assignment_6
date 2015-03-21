function MenuChoice()
{
    switch (document.getElementById("menu").value)
    {
        case "Please select an option":
            document.getElementById("addcustomer").style.visibility = "hidden";
            document.getElementById("changecustomer").style.visibility = "hidden";
            document.getElementById("deletecustomer").style.visibility = "hidden";
            break;
        case "Add a Customer":
            document.getElementById("addcustomer").style.visibility = "visible";
            document.getElementById("changecustomer").style.visibility = "hidden";
            document.getElementById("deletecustomer").style.visibility = "hidden";
            break;
        case "Change Customer Order Address":
            document.getElementById("addcustomer").style.visibility = "hidden";
            document.getElementById("changecustomer").style.visibility = "visible";
            document.getElementById("deletecustomer").style.visibility = "hidden";
            break;
        case "Delete Customer":
            document.getElementById("addcustomer").style.visibility = "hidden";
            document.getElementById("changecustomer").style.visibility = "hidden";
            document.getElementById("deletecustomer").style.visibility = "visible";
            break;
    }
}

function AddCustomer()
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
    
    //Collect customer data
    if (document.getElementById("custid").value.length == 5)
    {
        if (document.getElementById("custid").value == document.getElementById("custid").value.toUpperCase())
        {
            var customerid = document.getElementById("custid").value;
        }
        else
        {
            alert("Customer ID is not all uppercase.");
            return;
        }
    }
    else
    {
        alert("Please input a customer ID that is five characters.")
        return;
    }
    if (document.getElementById("custname").value !== "")
    {
       var customername = document.getElementById("custname").value; 
    }
    else
    {
        var customername = "null";
    }
    if (document.getElementById("custcity").value !== "")
    {
        var customercity = document.getElementById("custcity").value;
    }
    else
    {
        var customercity = "null";
    }
    
    //parameter string
    var newcustomer = '{"CustomerID":"' + customerid + '","CompanyName":"' + customername + '","City":"' + customercity + '"}';
    
    //Check for AJAX operation return
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            OperationAddResult(output);
        }
    }
    
    //Start ajax request
    objRequest.open("POST",url, true);
    objRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    objRequest.send(newcustomer);
}

function OperationAddResult(result)
{
    if (result.WasSuccessful == 1)
    {
        document.getElementById("addresults").innerHTML = "The operation was successful!";
    }
    else
    {
        document.getElementById("addresults").innerHTML = "The operation was not successful" + "<br>" + "Customer ID is already in use. Please input another customer ID.";
    }
}

function UpdateOrder()
{
    var objRequest = XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";
    
    //Get variables
    if (document.getElementById("orderid").value !== "")
    {
        var orderid = document.getElementById("orderid").value;
    }
    else
    {
        alert("Please input an order id.");
        return;
    }
    if (document.getElementById("shipaddress").value !== "")
    {
        var shippingaddress = document.getElementById("shipaddress").value;
    }
    else
    {
        var shippingaddress = "null";
    }
    if (document.getElementById("shipcity").value !== "")
    {
       var shippingcity = document.getElementById("shipcity").value; 
    }
    else
    {
        var shippingcity = "null";
    }
    
    if (document.getElementById("shipname").value !== "")
    {
        var shippingname = document.getElementById("shipname").value;
    }
    else
    {
        var shippingname = "null";
    }
    
    if (document.getElementById("shipcode").value !== "")
    {
       var shippingcode = document.getElementById("shipcode").value; 
    }
    else
    {
        var shippingcode = "null";
    }
    
    var updateorderid = '{"OrderID":"' + orderid + '","ShipName":"' + shippingname + '","ShipAddress":"' + shippingaddress + '","ShipCity":"' + shippingcity + '","ShipPostcode":"' + shippingcode + '"}';
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            OperationUpdateOrder(output);
        }
    }
    
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    objRequest.send(updateorderid);

}
//Check back later
function OperationUpdateOrder(result)
{
 if (result == 1)
    {
        document.getElementById("updateresults").innerHTML = "The operation was successful!";
    }
    else
    {
        document.getElementById("updateresults").innerHTML = "The operation was not successful" + "<br>" + "Either the order ID was not found or an unspecified error occured.";
    }
}

function DeleteCustomer()
{
    var confirmation = confirm("Are you sure you want to delete this customer?");
    if (confirmation == true)
    {
        var objRequest = new XMLHttpRequest();
        var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCustomer/"
        url += document.getElementById("deleteid").value;
    
        objRequest.onreadystatechange = function()
        {
            if (objRequest.readyState == 4 && objRequest.status == 200)
            {
                var output = JSON.parse(objRequest.responseText);
                OperationDeleteResult(output);
            }
        }
    
        objRequest.open("GET", url, true);
        objRequest.send();
    }
    else
    {
        return;
    }

    
}

function OperationDeleteResult(result)
{
    if (result.DeleteCustomerResult.WasSuccessful == 1)
    {
        document.getElementById("deleteresults").innerHTML = "The operation was successful!";
    }
    else
    {
        document.getElementById("deleteresults").innerHTML = "The operation was not successful" + "<br>" + "Either the Customer ID cannot be found or has orders in the system.";
    }
}