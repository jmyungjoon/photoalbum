$(document).ready(function(){
 
    load_folder_list();
    
    function load_folder_list()
    {
     var action = "fetch";
     $.ajax({
      url:"action.php",
      method:"POST",
      data:{action:action},
      success:function(data)
      {
       $('#folder_table').html(data);
      }
     });
    }
    
    $(document).on('click', '#create_folder', function(){
     $('#action').val("create");
     $('#folder_name').val('');
     $('#folder_button').val('Create');
     $('#folderModal').modal('show');
     $('#old_name').val('');
     $('#change_title').text("Create Folder");
    });
    
    $(document).on('click', '#folder_button', function(){
     var folder_name = $('#folder_name').val();
     var old_name = $('#old_name').val();
     var action = $('#action').val();
     if(folder_name != '')
     {
      $.ajax({
       url:"action.php",
       method:"POST",
       data:{folder_name:folder_name, old_name:old_name, action:action},
       success:function(data)
       {
        $('#folderModal').modal('hide');
        load_folder_list();
        alert(data);
        window.location.href("#portfolio")
       }
      });
     }
     else
     {
      alert("Enter Folder Name");
     }
    });
    
    $(document).on("click", ".update", function(){
     var folder_name = $(this).data("name");
     $('#old_name').val(folder_name);
     $('#folder_name').val(folder_name);
     $('#action').val("change");
     $('#folderModal').modal("show");
     $('#folder_button').val('Update');
     $('#change_title').text("Change Folder Name");
    });
    
    $(document).on("click", ".delete", function(){
     var folder_name = $(this).data("name");
     var action = "delete";
     if(confirm("Are you sure you want to remove it?"))
     {
      $.ajax({
       url:"action.php",
       method:"POST",
       data:{folder_name:folder_name, action:action},
       success:function(data)
       {
        load_folder_list();
        alert(data);
       }
      });
     }
    });
    
    $(document).on('click', '.upload', function(){
     var folder_name = $(this).data("name");
     console.log(folder_name);
     $('#hidden_folder_name').val(folder_name);
     $('#uploadModal').modal('show');
    });
    
    $('#upload_form').on('submit', function(){
     $.ajax({
      url:"upload.php",
      method:"POST",
      data: new FormData(this),
      contentType: false,
      cache: false,
      processData:false,
      success: function(data)
      { 
       load_folder_list();
       alert(data);
      }
     });
    });
    
    $(document).on('click', '.view_files', viewFiles);
    
    function viewFiles(e){
        
        var folder_name = $(this).data("name");
        var action = "fetch_files";
        $.ajax({
         url:"action.php",
         method:"POST",
         data:{action:action, folder_name:folder_name},
         success:function(data)
         {
          $('#img').html(data);
          $(document).ready(function() {
            $('.venobox').venobox();
          });
          $(document).on('click', '#the-img1', function(){
            this.exifdata = null;
            EXIF.getData(this, function() {
            var exifLong = EXIF.getTag(this, "GPSLongitude");
            
            var exifLat = EXIF.getTag(this, "GPSLatitude");
            var exifLongRef = EXIF.getTag(this, "GPSLongitudeRef");
            var exifLatRef = EXIF.getTag(this, "GPSLatitudeRef");
            if (exifLatRef == "S") {
                var latitude = (exifLat[0]*-1) + (( (exifLat[1]*-60) + (exifLat[2]*-1) ) / 3600);						
            } else {
                var latitude = exifLat[0] + (( (exifLat[1]*60) + exifLat[2] ) / 3600);
            }
    
            if (exifLongRef == "W") {
                var longitude = (exifLong[0]*-1) + (( (exifLong[1]*-60) + (exifLong[2]*-1) ) / 3600);						
            } else {
                var longitude = exifLong[0] + (( (exifLong[1]*60) + exifLong[2] ) / 3600);
            }
    
            wtmX = latitude,
            wtmY = longitude;
            console.log(wtmX, wtmY);
            if(exifLong === undefined){
              alert("There is no GPS infomation.")
            } 
            window.open(`http://www.google.com/maps/place/${wtmX},${wtmY}`);
            this.exifdata = null;
            });
          });
         }
        });
       
    }
    
    $(document).on('click', '.bx', bodyClass);
        const body = document.querySelector("body");
    function bodyClass(){
        if(body.class===""){
            body.classList="vbox-open";
            $(document).ready(function() {
                $('.venobox').venobox();
              });
        } else {
            
        }
    }

    $(window).on('load', function() {
        var portfolioIsotope = $('.portfolio-container').isotope({
          itemSelector: '.portfolio-item',
          layoutMode: 'fitRows'
        });
    
        $('#portfolio-flters li').on('click', function() {
          $("#portfolio-flters li").removeClass('filter-active');
          $(this).addClass('filter-active');
    
          portfolioIsotope.isotope({
            filter: $(this).data('filter')
          });
        });
    
        // Initiate venobox (lightbox feature used in portofilo)
        $(document).ready(function() {
          $('.venobox').venobox();
        });
      });
    
    $(document).on('click', '.remove_file', function(){
     var btn = event.target;
     console.log(btn);
     var div = btn.parentNode;
     console.log(div);
     var path = $(this).attr("id");
     var action = "remove_file";
     if(confirm("Are you sure you want to remove this file?"))
     {
      $.ajax({
       url:"action.php",
       method:"POST",
       data:{path:path, action:action},
       success:function(data)
       {
        alert(data);
        $('#filelistModal').modal('hide');
        load_folder_list();
        div.style="display:none";
       }
      });
     }
     
    });
   
   $(document).on('blur', '.change_file_name', function(){
     var folder_name = $(this).data("folder_name");
     var old_file_name = $(this).data("file_name");
     var new_file_name = $(this).text();
     var action = "change_file_name";
     $.ajax({
      url:"action.php",
      method:"POST",
      data:{folder_name:folder_name, old_file_name:old_file_name, new_file_name:new_file_name, action:action},
      success:function(data)
      {
       alert(data);
      }
     });
    });
    
   });

   $(document).on('click', '.name', function(){
    var sortName = document.querySelector("#sortName");
    if (sortName.innerHTML === "name(A-&gt;Z)"){
      sortName.innerHTML = "name(Z->A)";
    } else {
      sortName.innerHTML = "name(A->Z)";
    }
    var img = document.querySelectorAll("img");
    var original = document.querySelectorAll("#original");
    var theImg = document.querySelectorAll("#the-img1"); 
    console.log(theImg);
    var imgFiles = [];
    for ( i = 0; i < img.length; i++){
      imgFiles.push(img[i].src);
    };
      imgFiles.reverse();
    for ( i = 0; i < imgFiles.length; i++){
      img[i].src = imgFiles[i];
      original[i].href = imgFiles[i];
      theImg[i].src = imgFiles[i];
    };
   })

  $(document).on('click', '#sortDate', function(){

    var fileName = document.querySelectorAll("img");
    console.log(fileName);
    var date = [];
    for(i = 0; i < fileName.length; i++) {
      EXIF.getData(fileName[i], function() {
        date.push(EXIF.getTag(this, "DateTimeOriginal")+fileName[i].src); 
        if(date.length !== fileName.length){
          setInterval(console.log("please wait for a while",5000))
        }
      });
      this.exifdata = null;
      };
    console.log(date);
    date.reverse();
    console.log(date);
    var splitFiles =[];
    for(i =0; i < date.length; i++){
      splitFiles.push(date[i].split("http://ittcserver.net/photoalbum/"));
    };
    console.log(splitFiles);
    var img = document.querySelectorAll("img");
    var original = document.querySelectorAll("#original");
    var theImg = document.querySelectorAll("#the-img1"); 
    for ( i = 0; i < splitFiles.length; i++){
      img[i].src = splitFiles[i][1];
      original[i].href = splitFiles[i][1];
      theImg[i].src =splitFiles[i][1];
    };
    splitFiles = [];
  })

