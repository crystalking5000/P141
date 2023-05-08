object = "";
status ="";
results = [];

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start()
{
    object_detector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object = document.getElementById("input").value ;
}

function modelLoaded()
{
    console.log("your model is loaded!");
    status = true;
}

function draw()
{
    image (video, 0, 0, 480, 380);

    if(status != "")
    {
        objectDetector.detect(video, gotResult);

        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Object Found";

            fill ("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text (objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect (objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

}

function gotResult(error, results)
{
   if(error)
   {
       console.log(error);
   }
   else
   {
       console.log(results);
       objects = results;
   }
}