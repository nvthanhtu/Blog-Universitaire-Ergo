var ItemList=[];
var counting=1;
var curItemEdit=null;
var curItemIndex=null;
var curIndexList=null;
var curItemId=null;



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

    $('#checkall').click(function(){
    	if($(this).is(':checked')){
    		$('input:checkbox').attr('checked',true);
    	}
    	else{
    		$('input:checkbox').attr('checked',false);
    	}
    });

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
		var cell6 = row.insertCell(5);
	  	cell1.innerHTML = item.name;
	  	cell2.innerHTML = item.type;
	    cell3.innerHTML = "<img src=\'"+item.image+"\' width = 100px height=70px>";
		cell4.innerHTML = 
		"<button type=\"button\" class=\"btn btn-warning\" id = \'"+item.id+"\' onclick=\"showModalwithdetail(this.id)\" width=\"30\" height= \"30\"> <img src=\"Image/edit.ico\" width=\"20\" height=\"20\"></button>";
		cell5.innerHTML = 
		"<button type=\"button\" class=\"btn btn-warning\" id = \'"+item.id+"\' onclick=\"getCurItemSelected(this.id)\" width=\"30\" height= \"30\"> <img src=\"Image/delete.ico\" width=\"20\" height=\"20\"></button>";
		cell6.innerHTML = "<input type=\"checkbox\" name=\"chk\" value= \'"+item.id+"\'/>";
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

	function getCurItemSelected(itemId){
		curItemId=itemId;
		$('#confirm-delete-single-Modal').modal('toggle');
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
	  	for(var i=1; i<rowCount; i++) {
	   		var row = table.rows[i];
	    	var chkbox = row.cells[5].childNodes[0];
	    	if(null != chkbox && true == chkbox.checked) {
		    	
				row.remove();
				//find and delete item in ItemList
				for(var j=0; j<ItemList.length;j++){
					if(ItemList[j].id==row.id){
						ItemList.splice(j,1);
					}
				}
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



	function deleteSingleItem(){
		var found=false;
		for(var i=0; i<ItemList.length;i++){
			if(ItemList[i].id==curItemId){
				
				ItemList.splice(i,1);
				var row = document.getElementById(curItemId);
				row.remove();
				found=true;
				break;
			}
		}
		if(found){
			notify("alert alert-success","Element is removed");
		}
		else{
			notify("alert alert-warning","Can't find the object selected in ItemList");
		}
		$('#confirm-delete-single-Modal').modal('toggle');
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
			//var table = document.getElementById("mytable");
			var row = document.getElementById(curItemEdit.id);
			row.cells[0].innerHTML=item.name;
			row.cells[1].innerHTML=item.type;
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
	function showModalwithdetail(itemId){
		var item;
		for (i=0; i<ItemList.length;i++)
		{
			if (ItemList[i].id==itemId)
			{
				item = ItemList[i];
				curItemEdit=item;
				//curItemIndex=index;
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
		document.getElementById("title-noti").innerHTML= "";
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


