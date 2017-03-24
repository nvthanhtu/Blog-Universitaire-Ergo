var ItemList=[];
var counting=1;
var curItemEdit=null;
var curItemIndex=null;
var curIndexList=null;



	/*function removeElt(id){
		ItemList.splice(id,1);
		document.getElementById("mytable").deleteRow();
	}*/
	function showAlert() {
        $("#noti-success-alert").alert();
        $("#noti-success-alert").fadeTo(2000, 1000).slideUp(1000, function(){
                $("#noti-success-alert").slideUp(1000);
                });
    }

	$('#myModalMailling').on('show.bs.modal', function (event) {
	   	var button = $(event.relatedTarget) // Button that triggered the modal
	   	var recipient = button.data('receive') // Extract info from data-* attributes
	   	// If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
	   	// Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
	  	var modal = $(this)
	   	modal.find('.modal-title').text('New message to ' + recipient)
	   	modal.find('.modal-body input').val(recipient)
	});


	function addTotable(item){
		var table = document.getElementById("mytable");
		var rowCount = table.rows.length;
	    var row = table.insertRow(rowCount);
		row.id= item.id;
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 =row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 =  row.insertCell(4);
	  	cell1.innerHTML = item.name;
	  	cell2.innerHTML = item.type;
	    cell3.innerHTML = "<img src=\'"+item.image+"\' width = 100px height=70px>";
		cell4.innerHTML = "<button type=\"button\" class=\"btn btn-warning\" id = \'"+item.id+"\' onclick=\"showModalwithdetail(this.id,"+rowCount+")\">Edit</button>";
		cell5.innerHTML = "<input type=\"checkbox\" name=\"chk\" value= \'"+item.id+"\'/>";
		notify("alert alert-success","Element(s) generated into the list");
		
	}

	function generateElement()
	{
		var maxCur=ItemList.length;
		for(i=maxCur;i<maxCur+3;i++)
		{
			// create object
			var temp= {
				id:counting-1,
				name: "Batiment "+counting,
                type:"Batiment",
                image: "nautibus.jpg",
				description: name+" est blah blah blah"};
			// add to ItemList
			ItemList.push(temp);

     	counting ++;
		addTotable(ItemList[i]);
		}
	}

  	function addItem(){

		var name = $("#name").val();
		var type = $("#type").val();
		var image = "nautibus.jpg";
		var description = $("#description").val();
		//ajouter l'element dans la list ItemList

		var temp={
			id:counting-1,
			name: name,
     		type: type,
      		image: "nautibus.jpg",
			description: name+" est blah blah blah"
		};
		if (validate(temp))
		{
			ItemList.push(temp);
			counting++;
			addTotable(temp);
			$('#myModal').modal('hide');
		}
		else
		{
			notify("alert alert-warning","Invalid name");
			$('#myModal').modal('hide');
		}
  	}

	function deleteItem(){
		var countCheckBox=0;
		var table = document.getElementById("mytable");
	  	var rowCount = table.rows.length;
	  	for(var i=0; i<rowCount; i++) {
	   		var row = table.rows[i];
	    	var chkbox = row.cells[4].childNodes[0];
	    	if(null != chkbox && true == chkbox.checked) {
		    	table.deleteRow(i);
				ItemList.splice(i,1);
		      	rowCount--;

		      	i--;
				countCheckBox++;
	    	}
		}
		if (countCheckBox==0)
		{
			notify("alert alert-warning","I can't delete if you didn't choose anything");
		}
		else {
			notify("alert alert-success","Element(s) removed from the list");
		}
		$('#confirm-delete-Modal').modal('hide');
	}


	function editItem(){
		var item = curItemEdit;
		//update item
		item.name = $("#edit-Modal").find('input[id="name"]').val();
		item.type = $("#edit-Modal").find('select[id="type"]').val();
		item.description = $("#edit-Modal").find('input[id="description"]').val();

		//update ItemList
		try{
			if (ItemList[curIndexList] != curItemEdit) 
			{
				throw "Error during updating ItemList";
			}
			ItemList[curIndexList]=item;
			var table = document.getElementById("mytable");
			table.rows[curItemIndex].cells[0].innerHTML=item.name;
			table.rows[curItemIndex].cells[1].innerHTML=item.type;
	  		//other cell keep the same info

	  		//notify
	  		notify("alert alert-success","Item id "+item.id+" is edited");
		}
		catch (err){
			notify("alert alert-danger",err);
		}
		$('#edit-Modal').modal('toggle');
	}

	//show modal create with item detail
	function showModalwithdetail(itemId,index){
		var item;
		for (i=0; i<ItemList.length;i++)
		{
			if (ItemList[i].id==itemId)
			{
				item = ItemList[i];
				curItemEdit=item;
				curItemIndex=index;
				curIndexList=i;
				break;
			}
		}
		$("#edit-Modal").find('input[id="name"]').val(item.name);
		$("#edit-Modal").find('select[id="type"]').val(item.type);
		$("#edit-Modal").find('input[id="description"]').val(item.description);
		$("#edit-Modal").modal('toggle');
	}

	function validate(item){
		if (item.name == null || item.name =="")
			return false;
		else 
		{
			return true;
		}
	}

	function notify(class_type, mess){
		var message =document.getElementById("noti-success-alert");
		//if(message.hasClass("hide"))
			//message.removeClass("hide");
		message.setAttribute("class",class_type);
		document.getElementById("message-noti").innerHTML= mess;
		showAlert();
	}

	function notiAlarm(message){
		popup = window.open(message);
    	setTimeout(closeNoti, 1000);
	}

	function closeNoti(){
		popup.close();
	}


