# shadow.js  
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

particle system added, now you can create different particles, for snow/rain and other.

![image](https://github.com/VitionVlad/shadow.js/assets/48290199/72bde637-575d-4c00-90fe-dccbd763f822)

now, you can pass an Uniform class to an additionaluniform field in mesh (array requiered) and get as many as you want uniforms with different values (vec2, vec3, mat4, float, textures, cubemaps)

![image](https://github.com/VitionVlad/shadow.js/assets/48290199/08fd815d-a687-45a3-87a8-7137961f62ad)

![image](https://github.com/VitionVlad/shadow.js/assets/48290199/579a2c30-c5c9-4ed8-9a3c-a1b4235c7fcb)

and use it like this:

    var uni = new Uniform(333);
    mesh.additionaluniform = new Array([uni]);


Now you can add simple physiscs for meshes via the prop class, it has mass, and uses two meshes, one will interact with other.

    var prop1 = new Prop(0.1);
    prop1.MeshMeshInteract(mesh2, mesh);
