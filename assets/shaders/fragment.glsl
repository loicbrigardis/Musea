#pragma glslify: pnoise3 = require(glsl-noise/simplex/3d) 

uniform sampler2D texture;
uniform vec4 resolution;
uniform float progress;
uniform float time;

varying vec2 vUv;
varying float vCadre;
varying vec3 vPosition;

void main() {
  vec2 newUv = ((vUv - vec2(1.0))*resolution.zw +vec2(1.0));
  vec3 tex = texture2D(texture, newUv).xyz;

  tex += vCadre *0.05;
  float newtime = time * 0.05;
  //Alpha channel
  float alpha = 1.-( (pnoise3(vPosition + newtime*0.2)*6.) * progress ) ;
  

  gl_FragColor = vec4(tex,alpha);
}