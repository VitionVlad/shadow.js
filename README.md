 shadow.js
3d engine for your web site
it is simple to integrate, can show a good graphics, allow to write your custom shaders, and a lot of fun with shadows!
main feature is that you can mix shadowpass with main pass to get multiple shadow maps, or even, render diferent shadows for an object, like a box that casts a sphere as shadow
![Screenshot from 2023-04-10 14-07-26](https://user-images.githubusercontent.com/48290199/230917887-7d5dec8f-5dca-4782-9233-8edd378f8da4.png)
# How to use?
first, create an engine handle

    var eng = new Engine("#glcanvas", standartPostProces, true, true, 4000);

where "#glcanvas" is id to your canvas, standartPostProces shader is shader for post procesing, and a basic one comes with engine, one true is to change the resolution to screen resolution, another for orietantion, and last is shadowmap resolution

now create a mesh, for example:

    var mesh = new Mesh(vertexes, normals, uv, standartFragmentShader, standartVertexShader, eng, albedotexture, speculartexture, normalmap, texture X resolution, texture Y resolution, collision can be true or false, cubemap you can pass null);
    
and a function for infinite loop, you can copy this, then make your changes, main thing here is to endFrame() function to be at end, other dont matter

    function drawFrame(now){
        eng.beginShadowPass();
        
        mesh.Draw(eng);

        eng.beginFrame();
        
        mesh.Draw(eng);

        eng.endFrame(drawFrame, now);
    }
   

of course dont forget to do some configurations like:

    eng.pos.y = -2.7;
    eng.rot.x = 0.0;
    eng.rot.y = 0.0;
    eng.shadowpos.z = -1.0;
    eng.shadowpos.y = -2.7;
    eng.shadowrot.y = 0.7;
    
for positions or

    eng.useorthosh = true;
    eng.sfar = 100.0;
    eng.sfov = 15.0;

shadowmap fov, far, or even use orthographic projection, where sfov will be the size, same goes with main camera:

    eng.fov = 4;
    eng.useortho = true;
    
![Screenshot from 2023-04-10 15-03-15](https://user-images.githubusercontent.com/48290199/230928960-1eb206a4-f85a-4606-ad74-3a4fb5e61a88.png)

i added an additional float to transmit different values, and random valuea for other cool effects
and thats all, even basic physisc for player and collisiiopn will be here, so have fun!
