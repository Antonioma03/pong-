//------------CARGAMOS LAS PALETAS DEL JUGADOR 1 EN VARIABLES ---------------

//---------------UBICALAS EN UNA POSICION EN X y Y EN PANTALLA--------------
var paddle1=10;
var paddle1X=10;
var paddle1Y;

//------------CARGAMOS LAS PALETAS DEL JUGADOR 2 EN VARIABLES ---------------
//---------------UBICALAS EN UNA POSICION EN X y Y EN PANTALLA--------------
var paddle2=10;
var paddle2Y=685;




// ------------------CARGA LOS VALORES DE TAMAÑO DE LAS PALETAS ----------------

var paddle1Height=100; 
var paddle2Height=100;


//--------------CARGA LOS VALORES DE LOS PUNTOS INICIALES DE CADA JUGADOR---------------
var score1=0;
var score2=0;



//--------------CARGA LOS VALORES DEL PUNTAJE ACUMULADO DEL J1 Y LA PC------------------
var playerscore=0;
var pcscore=0;



//posición y velocidad x, y de la pelota y su radio

var pelota = {
    x:350/2,
    y:480/2,
    r:50,
    dx:3,
    dy:3
}



//----------------CREA LAS VARIABLES DE LA NARIZ EN X y Y, ADEMÁS EL PUNTAJE DE POSENET--------------
nariz_X=0;
nariz_Y=0
puntos_nariz=0;





//----------------CRE LA VARIABLE QUE DEFINE EL ESTATUS DEL JUEGO --------------
estatus="";





// -----------COMPLETA LA FUNCION PRELOAD DONDE ESTARAN LOS SONIDOS DEL JUEGO-----------
 function preload() 
 {

    //---------------PRE-CARGA DE SONIDOS DEL JUEGO EN VARIABLES-----------------

     ball_touch_paddel=loadSound("ball_touch_paddel.wav");
     missed =loadSound("missed.wav");

 }


 // -----------CREA LA FUNCION SETUP PARA CARGAR EL LIENZO, LA CAMARA Y POSENET---------------
 // ---------EL TAMAÑO DEL LIENZO SERA DE 700 X 600------------------
function setup(){
    var canvas=createCanvas (700,600);
    canvas.parent('canvas');
    video=createCapture(VIDEO);
    video.size(700,600);
video.hide();
poseNet=ml5.poseNet(video,modelocargado);
poseNet.on('pose',gotPoses);
}
//-----------CREA LA FUNCION DE MODELO CARGADO PARA ENVIAR MENSAJE A LA CONSOLA---------------
function modelocargado(){
    console.log("posenet ya se cargo");
}

//-------------- CREA LA FUNCION GOTRESULT QUE CAPTURA RESULTADOS DEL POSENET------------
function gotPoses(results){
    if(results.length>0){
        nariz_X=results[0].pose.nose.x;
        nariz_Y=results[0].pose.nose.y;
        puntos_nariz=results[0].pose.keypoints[0].score;
    }
}

//-----------------CREA LA FUNCION JUGAR PARA INICIAR EL JUEGO  -----------------
//-----------EN ESTA FUNCIÓN SE CARGA EL ESTATUS Y SE PONE EL MENSAJE EN EL ID RESPECTIVO----------------
function jugar(){
    estatus="jugar";
    document.getElementById("estatus").innerHTML="eljuegosecargo";
}
//----------------COMPLETA LA FUNCION DE DIBUJO SOBRE LIENZO -----------

function draw()
{
    if(estatus=="jugar")
    {
        background(0); 

        //---------CARGA EL VIDEO SOBRE EL LIENZO PARA VER TU CAMARA-----------------------
       image(video,0,0,700,600)


        //--------------ELIGE EL COLOR DE FONDO DEL LIENZO--------------
        //-------RECUERDA QUE EL LIENZO ES UN RECTANGULO, CREALO ----------------------
fill("black");
stroke("black");
 rect(680,0,20,700);      
 fill("black");
 stroke("black");
  rect(0,0,20,700);      
        //-----------CREA LA CONDICION PARA RECONOCER LA NARIZ EN PANTALLA-------------------

        if(puntos_nariz>0.2)
        {

            //------------ELIGE EL COLOR DEL PUNTO QUE SALDRA SOBRE TU NARIZ----------------
            fill("#0bec30");
stroke("#0bec30");
 circle(nariz_X,nariz_Y,10);      




            //------------CREA UN CIRCULO PARA EL PUNTO SOBRE TU NARIZ--------------------
           


        }


        //Llamar a la función paddleInCanvas 
        paddleInCanvas();
        
        //-------------ELIGE UN COLOR PARA TU PALETA------------
        fill("#0004fd");
        stroke("#0004fd");
        strokeWeight(0.5);
        paddle1Y = nariz_Y; 

        //-------------CREA LA PALETA EN FORMA DE RECTANGULO DELGADO DEL LADO IZQUIERDO----------
     rect(paddle1X,paddle1Y,paddle1,paddle1Height,100)
     



        //--------------ELIGE UN COLOR PARA LA PALETA DE LA COMPUTADORA-------------------
        fill(" #ff0606");
        stroke("#ff0606");


        var paddle2y =pelota.y-paddle2Height/2;  

        //-------------CREA LA PALETA EN FORMA DE RECTANGULO DELGADO DEL LADO DERECHO----------
        rect(paddle2Y,paddle2y,paddle2,paddle2Height,100) 



    
        //Llamar a la función  midline
        midline();
    
        //Llamar a la función drawScore
         drawScore();

        //Llamar a la función models  
        models();

         //Llamar a la función move, la cual es muy importante
        move();

    }

}



//Función reset, para cuando la pelota no entra en contacto con la paleta

function reset()
{
   pelota.x = width/2+100,
   pelota.y = height/2+100;
   pelota.dx =3;
   pelota.dy =3;   
}


//La función midline dibuja una línea en el centro
function midline()
{
    for(i=0;i<480;i+=10) 
    {
        var y = 0;
        fill("white");
        stroke(0);
        rect(width/2,y+i,10,480);
    }
}


//---------------La función drawScore muestra los puntajes en pantalla-------------------------

function drawScore()
{

    // ---------------CENTRA EL TEXTO EN LA PANTALLA----------------
   textAlign(CENTER);

    //----------ELIGE EL TAMAÑO DEL TEXTO--------------------
    textSize(15);
    
    //---------------ELIGE EL COLOR DEL TEXTO-------------------
    fill("white");
        stroke("white");


    //------------USANDO LA FUNCION TEXT MUESTRA LOS PUNTAJES EN PANTALLA------------
   text("tu",100,50);
   text(playerscore,140,50);
   text("pc",500,50);
   text(pcscore,555,50);
}


//Función muy importante para este juego
function move()
{
   fill(50,350,0);
   stroke(255,0,0);
   strokeWeight(0.5);
   ellipse(pelota.x,pelota.y,pelota.r,20)
   pelota.x = pelota.x + pelota.dx;
   pelota.y = pelota.y + pelota.dy;

    if(pelota.x + pelota.r > width - pelota.r/2)
    {
       pelota.dx = -pelota.dx - 0.5;       
    }

    if (pelota.x - 2.5 * pelota.r/2 < 0)
    {
        if (pelota.y >= paddle1Y && pelota.y <= paddle1Y + paddle1Height) 
        {
            pelota.dx = -pelota.dx+0.5; 
            ball_touch_paddel.play();
            playerscore++;
        }

        else
        {
            pcscore++;
            missed.play();
            reset();
            navigator.vibrate(100);
        }
    }

    if(pcscore ==4)
    {
        fill("#FFA500");
        stroke(0)
        rect(0,0,width,height-1);
        fill("white");
        stroke("white");
        textSize(25);


        //-------------CREA UN TEXTO EN LA MITAD DE LA PANTALLA INDICANDO QUE EL JUEGO TERMINO---------
text("fin del juego",width/2,height/2);


        //------------CREA OTRO TEXTO INDICANDO QUE PARA VOLVER A JUGAR DEBE PRESIONAR REINICIAR-----------
        text("presione reinisiar para volver a inisiar",width/2,height/2+30);

        noLoop();

        //--------------REINICIA EL PUNTAJE DE LA COMPUTADORA A CERO-------------------
       pcscore=0;



    }
   
    if(pelota.y+pelota.r > height || pelota.y-pelota.r <0)
    {
        pelota.dy =- pelota.dy;
    }   
}


//Ancho, altura y velocidad de la pelota escritos en el canvas
function models()
{
    textSize(18);
    fill(255);
    noStroke();
    text("Velocidad de la pelota: "+abs(pelota.dx),150,20);

}


//Esta función ayuda a que la pelota no salga del canvas
function paddleInCanvas()
{
  if(mouseY + paddle1Height > height)
  {
    mouseY = height - paddle1Height;
  }

  if(mouseY < 0)
  {
     mouseY =0;
  }
 
  
}



//----------COMPLETA LA FUNCION DE REINICIO-------------------
function restart()
{

    //-------------USA EL COMANDO DE BUCLE PARA REINICIAR EL JUEGO------
  loop();

    //----------------REINICIA LOS PUNTAJES DEL J1 Y LA COMPUTADORA A CERO-------------------
 pcscore=0;
 playerscore=0;
 

}
