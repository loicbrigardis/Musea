uniform float progress;
uniform float time;

varying vec2 vUv;
varying float vCadre;
varying vec3 vPosition;

float border(vec2 uv) {
    float border = 0.0001;
    float rect = smoothstep(border, border  +0.0001, uv.x);
    float rect2 = smoothstep(border, border  +0.0001, uv.y);
    float rect3 = smoothstep(border, border  +0.0001, 1.-uv.y);
    float rect4 = smoothstep(border, border  +0.0001, 1.-uv.x);
    float rectangle = 1. - (rect * rect2 * rect3 * rect4);
    return rectangle;
}

void main() {
    vUv = uv;
    vec3 newpos = position;
    float dist = distance(vUv, vec2(0.5)) / length(vec2(0.5));

    float superProgree = min(2.*progress, 2.*(1.-progress));

    float zOffset = 2.;
    float zProgress = clamp(2. * progress, 0., 1.);

    newpos.z += zOffset*(dist * superProgree - zProgress);

    newpos.z += 0.1*(sin(dist*20. + time * 8.) * progress);

    vCadre = border(vUv.xy) * progress;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( newpos, 1.0 );
    vPosition = position;
}