var locked = false;

function main(){
    document.body.style.cursor = 'none';
    const speed = 0.1;
    const sensivity = 1;
    var eng = new Engine("#glcanvas", standartPostProces, true, true, 4000);
    eng.useorthosh = true;
    eng.sfar = 100.0;
    eng.sfov = 15.0;
    //eng.playerphysics = false;
    eng.pos.z = -1.0;
    eng.pos.y = -2.7;
    eng.rot.x = 0.0;
    eng.rot.y = 0.0;
    eng.shadowpos.z = -1.0;
    eng.shadowpos.y = -2.7;
    eng.shadowrot.y = 0.7;
    eng.setLight(0, new vec3(0, 1, 1), new vec3(1, 1, 1), 1);
    var cubem = new cubeMap(right, left, ttop, bottom, back, front, 512, 512, eng);
    var mesh = new Mesh(susv, susn, susu, standartFragmentShader, standartVertexShader, eng, tex, spec, norm, texx, texy, true, cubem);
    mesh.pos.y = 1;
    mesh.pos.z = -1.5;
    var mesh2 = new Mesh(planev, planen, planeu, standartFragmentShader, standartVertexShader, eng, tex, spec, norm, texx, texy, true, cubem);
    var mesh3 = new Mesh(skyv, skyn, skyu, standartSkyboxShaderFragment, standartSkyboxShaderVertex, eng, null, null, null, 1, 1, false, cubem);
    mesh3.cullmode = eng.gl.FRONT;
    mesh3.rot.y = 3.0;
    function key_callback(){
        document.addEventListener('keydown', function(event) {
            if (event.key == "w") {
                eng.pos.z += Math.cos(eng.rot.y) * Math.cos(eng.rot.x) * speed;
                eng.pos.x -= Math.cos(eng.rot.y) * Math.sin(eng.rot.x) * speed;
            }
            if (event.key == "a") {
                eng.pos.x += Math.cos(eng.rot.y) * Math.cos(eng.rot.x) * speed;
                eng.pos.z += Math.cos(eng.rot.y) * Math.sin(eng.rot.x) * speed;
            }
            if (event.key == "s") {
                eng.pos.z -= Math.cos(eng.rot.y) * Math.cos(eng.rot.x) * speed;
                eng.pos.x += Math.cos(eng.rot.y) * Math.sin(eng.rot.x) * speed;
            }
            if (event.key == "d") {
                eng.pos.x -= Math.cos(eng.rot.y) * Math.cos(eng.rot.x) * speed;
                eng.pos.z -= Math.cos(eng.rot.y) * Math.sin(eng.rot.x) * speed;
            }
        }, true);
    }
    function mousecallback(){
        document.addEventListener("mousemove", function(event){
            eng.rot.x += ((event.movementX) / (eng.gl.canvas.width/2))/sensivity;
            eng.rot.y += ((event.movementY) / (eng.gl.canvas.height/2))/sensivity;
            if(eng.rot.y > 1.5){
                eng.rot.y = 1.5;
            }
            if(eng.rot.y < -1.5){
                eng.rot.y = -1.5;
            }
        }, false);     
        document.getElementById("glCanvas").onclick = function(){
            document.getElementById("glCanvas").requestPointerLock();
            document.getElementById("glCanvas").requestFullscreen();
        };
    }

    var resolution = new vec2(eng.canvas.width, eng.canvas.height);
    var x, y;
    var stillt = false;
    var touchHandler = function(event) {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    }
    var begtouch = function(event) {
        stillt = true;
    }
    var endtouch = function(event) {
        stillt = false;
    }
    eng.canvas.addEventListener("touchmove", touchHandler);
    eng.canvas.addEventListener("touchstart", begtouch);
    eng.canvas.addEventListener("touchend", endtouch);

    var tst = new ParticleSystem(2, 2, 3, -2, 5, -2, -1, 0.15);
    tst.randomfall = true;
    
    mousecallback();
    key_callback();
    drawFrame();
    function drawFrame(now){
        eng.beginShadowPass();
        
        mesh.Draw(eng);
        mesh2.Draw(eng);
        tst.Draw(mesh, eng);

        eng.beginFrame();
        var touchpos = new vec2(x, y);
        if(stillt === true){
            if(touchpos.x < resolution.x/2){
                eng.pos.z += Math.cos(eng.rot.y) * Math.cos(eng.rot.x) * (((((-touchpos.y/resolution.y)*2) +1)*0.01)*2);
                eng.pos.x -= Math.cos(eng.rot.y) * Math.sin(eng.rot.x) * (((((-touchpos.y/resolution.y)*2) +1)*0.01)*2);
            }else if(touchpos.x > resolution.x/2){
                eng.rot.x += (((((touchpos.x/resolution.x)-0.5)*2)*2)-1)/100;
                eng.rot.y -= ((((-touchpos.y/resolution.y)*2) +1)*0.01);
            }
        }

        mesh3.Draw(eng);
        mesh.Draw(eng);
        mesh2.Draw(eng);
        tst.Draw(mesh, eng);

        eng.endFrame(drawFrame, now);
    }
}

window.onload = main;
