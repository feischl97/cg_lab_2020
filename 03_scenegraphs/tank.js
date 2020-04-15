var tankVertexBuffer, tankColorBuffer, tankIndexBuffer;

var h = 0.05;
var l = 0.8;
var w = 0.45;
var f = 0.6;
var s = 0.08;

var tankVertices = new Float32Array([
  -l,-h,-w,  l,-h,-w,   -l, -h,w,   l, -h,w,
  -l,h,-w,   l,h,-w,    -l, h,w,    l, h,w,
  -l+s,h*4,-w+s,  l-f,h*4,-w+s,   -l+s,h*4,w-s, l-f,h*4,w-s
]);
var tankIndices = new Float32Array([
  0,1,2,  1,2,3,
  4,5,6,  5,6,7,
  0,2,4,  2,4,6,
  0,1,4,  1,4,5,
  1,3,5,  3,5,7,
  2,3,6,  3,6,7,
  4,5,8,  5,8,9,
  4,6,8,  6,8,10,
  5,7,9,  7,9,11,
  6,7,10, 7,10,11,
  8,9,10, 9,10,11
]);
var tankColors = new Float32Array([
  0,1,0, 0,1,0, 0,1,0, 0,1,0,
  1,1,1, 1,1,1, 1,1,1, 1,1,1,
  0,0,1, 0,0,1, 0,0,1, 0,0,1
]);


var topVertexBuffer, topColorBuffer, topIndexBuffer;

var tw = 0.24;
var tl = 0.18;
var th = 0.1;

var topVertices = new Float32Array([
  -tl,-th,-tw,   tl*1/4,-th,-tw,  -tl,-th,tw,   tl*1/4,-th,tw,
  tl*3/4,-th,-tw*2/3,    tl,-th,-tw*1/3,    tl,-th,tw*1/3,     tl*3/4,-th,tw*2/3,     tl*1/4,-th,0,
  -tl,th,-tw,   tl*1/4,th,-tw,  -tl,th,tw,   tl*1/4,th,tw,
  tl*3/4,th,-tw*2/3,     tl,th,-tw*1/3,     tl,th,tw*1/3,      tl*3/4,th,tw*2/3,      tl*1/4,th,0,

]);
var topIndices = new Float32Array([
  0,1,2,     1,2,3,
  1,4,8,     4,5,8,     5,6,8,     6,7,8,     3,7,8,
  9,10,11,   10,11,12,
  10,13,17,  13,14,17,  14,15,17,  15,16,17,  12,16,17,
  0,2,9, 2,9,11, 0,1,9, 1,9,10, 2,3,11, 3,11,12,
  1,4,10, 4,10,13, 4,5,13, 5,13,14, 5,6,14, 6,14,15, 6,7,15, 7,15,16, 3,7,12, 7,12,16

]);
var topColors = new Float32Array([
  0,1,0, 0,1,0, 0,1,0, 0,1,0,
  1,1,1, 1,1,1, 1,1,1, 1,1,1,
  0,0,1, 0,0,1, 0,0,1, 0,0,1
]);

var barrelVertexBuffer, barrelColorBuffer, barrelIndexBuffer;

var bl = 0.65;
var b1 = 0.045;
var b2 = 0.0297;

var barrelVertices = new Float32Array([
  -bl,-b1,0,    bl,-b1,0,
  -bl,-b2,b2,   bl,-b2,b2,
  -bl,0,b1,     bl,0,b1,
  -bl,b2,b2,    bl,b2,b2,
  -bl,b1,0,     bl,b1,0,
  -bl,b2,-b2,   bl,b2,-b2,
  -bl,0,-b1,    bl,0,-b1,
  -bl,-b2,-b2,  bl,-b2,-b2,
  -bl,0,0,      bl,0,0
]);
var barrelIndices = new Float32Array([
  0,1,2,    1,2,3,    2,3,4,    3,4,5,
  4,5,6,    5,6,7,    6,7,8,    7,8,9,
  8,9,10,   9,10,11,  10,11,12, 11,12,13,
  12,13,14, 13,14,15, 14,15,0,  15,0,1,
  17,0,2,   17,2,4,   17,4,6,   17,6,8,  17,8,10, 17,10,12, 17,12,14, 17,14,0,
  16,0,2,   16,2,4,   16,4,6,   16,6,8,  16,8,10, 16,10,12, 16,12,14, 16,14,0



]);
var barrelColors = new Float32Array([
  0,1,0, 0,1,0, 0,1,0, 0,1,0,
  1,1,1, 1,1,1, 1,1,1, 1,1,1,
  0,0,1, 0,0,1, 0,0,1, 0,0,1
]);

var bottomVertexBuffer, bottomColorBuffer, bottomIndexBuffer;

var btl = 0.85;
var btw = 0.4;
var bth = 0.12;


var bottomVertices = new Float32Array([
  -btl*0.8125,-bth,btw,   -btl*0.9375,-bth*2/3,btw,   -btl,0,btw,   -btl*0.9375,bth*2/3,btw,  -btl*0.8125,bth,btw,
  btl*0.8125,bth,btw,      btl*0.9375,bth*2/3,btw,      btl,0,btw,   btl*0.9375,-bth*2/3,btw,  btl*0.8125,-bth,btw,
  0,0,btw,
  -btl*0.8125,-bth,-btw,   -btl*0.9375,-bth*2/3,-btw,   -btl,0,-btw,   -btl*0.9375,bth*2/3,-btw,  -btl*0.8125,bth,-btw,
  btl*0.8125,bth,-btw,      btl*0.9375,bth*2/3,-btw,      btl,0,-btw,   btl*0.9375,-bth*2/3,-btw,  btl*0.8125,-bth,-btw,
  0,0,-btw,
]);
var bottomIndices = new Float32Array([
  0,1,10, 1,2,10, 2,3,10, 3,4,10, 4,5,10, 5,6,10, 6,7,10, 7,8,10, 8,9,10, 0,9,10,
  11,12,21, 12,13,21, 13,14,21, 14,15,21, 15,16,21, 16,17,21, 17,18,21, 18,19,21, 19,20,21, 11,20,21,
  0,9,11,  9,11,20, 0,1,11, 1,11,12, 1,2,12, 2,12,13, 2,3,13, 3,13,14, 3,4,14, 4,14,15, 4,5,15, 5,15,16,
  5,6,16, 6,16,17, 6,7,17, 7,17,18, 7,8,18, 8,18,19, 8,9,19, 9,19,20
]);
var bottomColors = new Float32Array([
  0,1,0, 0,1,0, 0,1,0, 0,1,0,
  1,1,1, 1,1,1, 1,1,1, 1,1,1,
  0,0,1, 0,0,1, 0,0,1, 0,0,1
]);


var bulletVertexBuffer, bulletColorBuffer, bulletIndexBuffer;

var bul=0.04;
var bul1=0.02;
var bul2=0.01;

var bulletVertices = new Float32Array([
  -bul,-bul1,-bul2,   -bul,-bul2,-bul1,   -bul,bul2,-bul1,    -bul,bul1,-bul2,
  -bul,-bul1,bul2,    -bul,-bul2,bul1,    -bul,bul2,bul1,     -bul,bul1,bul2,
  -bul,0,0,
  bul,-bul1,-bul2,    bul,-bul2,-bul1,    bul,bul2,-bul1,     bul,bul1,-bul2,
  bul,-bul1,bul2,     bul,-bul2,bul1,     bul,bul2,bul1,      bul,bul1,bul2,
  bul,0,0,
  bul*2,0,0
]);
var bulletIndices = new Float32Array([
  0,1,8,  1,2,8,  2,3,8,   3,7,8,    4,5,8,   5,6,8,  6,7,8,  0,4,8,
  9,10,17,  10,11,17,   11,12,17, 12,16,17, 16,15,17, 14,15,17,   9,13,17,    13,14,17,
  0,1,9, 1,9,10,  1,2,10,2,10,11, 2,3,11, 3,11,12,  3,7,12, 7,12,16, 6,7,15, 7,15,16,
  5,6,14, 6,14,15,  4,5,13, 5,13,14,  0,4,9,  4,9,13,
  9,10,18,  10,11,18, 11,12,18, 12,16,18, 15,16,18, 14,15,18, 13,14,18, 9,13,18
]);
var bulletColors = new Float32Array([
  0,1,0, 0,1,0, 0,1,0, 0,1,0,
  1,1,1, 1,1,1, 1,1,1, 1,1,1,
  0,0,1, 0,0,1, 0,0,1, 0,0,1
]);
