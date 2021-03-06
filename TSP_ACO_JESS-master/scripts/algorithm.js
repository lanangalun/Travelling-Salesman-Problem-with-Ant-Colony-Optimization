// var wMax=0.9;
// var wMin=0.05;
// var c1=2;
// var c2=2;
// var r1;
// var r2;

function ACO(data){
	var Rho =	0.5;
	var Thao = 	0.2;
	var alpha = 1;
	var betha = 1;
	var m = 5;
	var n = 5;
	var lenD = data.length;
	var posisi = randPosisi(data, 1);
	
	console.log(data);

	var randomSemut = pengkodeanPopulasi(posisi)
	console.log(randomSemut);
	var urutandummy = [[1,0,3,4,2]];
	console.log(urutandummy);

	var penyebut = nilaiPenyebut(Thao, alpha, betha, data);
	console.log(penyebut);
	var sortRS = sortPenyebut(urutandummy, penyebut);
	console.log(sortRS);
	
	var kelilingKota = urutanKota(Thao, alpha, betha,penyebut, data,urutandummy)
	console.log(kelilingKota)

	// var Random = 
	// var fitness = hitungFitnessPopulasi(data,randomSemut);						//Fitness
	// console.log(fitness);

	 
}
//Perhitungan PSO
// function PSO(data,partikel,maxIter){
// 	var t0 = performance.now();
// 	var k = 1;
// 	var w = wMax-(wMax-wMin)/maxIter*k;
// 	randomingr1r2();
// 	var dummyPbest = new Array();											//Buat Dummy Pbest
// 	for(var i=0;i<partikel;i++){
// 		dummyPbest[i]=[];
// 		dummyPbest[i][0]=Infinity;
// 	}
// 	var posisi = randPosisi(data,partikel);									//Posisi Partikel
// 	var kecepatan = randKecepatan(data,partikel);							//Kecepatan Partikel
// 	var urutan = pengkodeanPopulasi(posisi);								//Urutan kota
// 	var fitness = hitungFitnessPopulasi(data,urutan);						//Fitness
// 	var pbestA = hitungPbest(dummyPbest,posisi,fitness);					//Pbest
// 	var gbest = hitungGbest(pbestA);										//Gbest
// 	var kecepatanBaru = updateKecepatan(posisi,kecepatan,gbest,pbestA,w);	//Kecepatan baru
// 	var posisiBaru = updatePosisi(kecepatanBaru,posisi);					//Posisi baru
// 	k++;																	//Penambahan iterasi 1 menjadi 2
// 	while(k<=maxIter){
// 		//randomingr1r2();													//Jika ingin random r1 r2 setiap iterasi
// 		w = wMax-(wMax-wMin)/maxIter*k;
// 		posisi = copyD(posisiBaru);
// 		kecepatan = copyD(kecepatanBaru);
// 		urutan = pengkodeanPopulasi(posisi);									
// 		fitness = hitungFitnessPopulasi(data,urutan);							
// 		pbest = hitungPbest(pbestA,posisi,fitness);						
// 		gbest = hitungGbest(pbest);				
// 		kecepatanBaru = updateKecepatan(posisi,kecepatan,gbest,pbestA,w);
// 		posisiBaru = updatePosisi(kecepatanBaru,posisi);
// 		pbestA = copyD(pbest);										
// 		k++;						
// 	}
// 	var urutanGB = urutanGBest(gbest);
// 	var t1 = performance.now();
// 	var rows = "";
// 	rows += "<tr><td>" + "PSO" + "</td><td>" + partikel + "</td><td>" + maxIter + "</td><td>" + (t1 - t0) + " ms</td><td>" + gbest[0] + "</td><td>" + urutanGB + "</td></tr>";
//     $(rows).appendTo("#list tbody");
//     posisi = null;
// 	kecepatan = null;
//}
//Perhitungan MPSO
function MPSO(data,partikel,maxIter){
	var t0 = performance.now();
	var k = 1;
	var w = wMax-(wMax-wMin)/maxIter*k;
	randomingr1r2();
	var dummyPbest = new Array();
	for(var i=0;i<partikel;i++){											//Buat Dummy Pbest
		dummyPbest[i]=[];
		dummyPbest[i][0]=Infinity;
	}
	var posisi = randPosisi(data,partikel);									//Posisi Partikel
	var kecepatan = randKecepatan(data,partikel);							//Kecepatan Partikel
	var urutan = pengkodeanPopulasi(posisi);								//Urutan kota
	var fitness = hitungFitnessPopulasi(data,urutan);						//Fitness
	posisi = modifiedStep(data,posisi,fitness,w);							//Modified PSO
	urutan = pengkodeanPopulasi(posisi);
	fitness = hitungFitnessPopulasi(data,urutan);
	var pbestA = hitungPbest(dummyPbest,posisi,fitness);					//Pbest
	var gbest = hitungGbest(pbestA);										//Gbest
	var kecepatanBaru = updateKecepatan(posisi,kecepatan,gbest,pbestA,w);	//Kecepatan baru
	var posisiBaru = updatePosisi(kecepatanBaru,posisi);					//Posisi baru
	k++;																	//Penambahan iterasi 1 menjadi 2
	
	while(k<=maxIter){
		//randomingr1r2();													//Jika ingin random r1 r2 setiap iterasi
		w=wMax-(wMax-wMin)/maxIter*k;
		posisi = copyD(posisiBaru);
		kecepatan = copyD(kecepatanBaru);
		urutan = pengkodeanPopulasi(posisi);									
		fitness = hitungFitnessPopulasi(data,urutan);
		posisi = modifiedStep(data,posisi,fitness,w);
		urutan = pengkodeanPopulasi(posisi);
		fitness = hitungFitnessPopulasi(data,urutan);							
		pbest = hitungPbest(pbestA,posisi,fitness);						
		gbest = hitungGbest(pbest);									
		kecepatanBaru = updateKecepatan(posisi,kecepatan,gbest,pbestA,w);
		posisiBaru = updatePosisi(kecepatanBaru,posisi);
		pbestA = copyD(pbest);										
		k++;					
	}
	var urutanGB = urutanGBest(gbest);
	var t1 = performance.now();
	var rows = "";
	rows += "<tr><td>" + "MPSO" + "</td><td>" + partikel + "</td><td>" + maxIter + "</td><td>" + (t1 - t0) + " ms</td><td>" + gbest[0] + "</td><td>" + urutanGB + "</td></tr>";
	$(rows).appendTo("#list tbody");
	posisi = null;
	kecepatan = null;
}

	//Copy Matrix 2-dimension 
	function copyD(d){
	    var copyData = new Array ();
	 	for (var i=0; i < d.length ; i++) {
	        copyData[i] = [];
	        for (var j=0; j < d[0].length ; j++){
	            copyData[i][j]=d[i][j];            
	        }
	    }
	    return copyData;
	}
	//Copy Vector
	function copyV(v){
	    var copyVec = new Array ();
	 	for (var i=0; i < v.length ; i++) {
	        copyVec[i] = v[i];
	    }
	    return copyVec;
	}
	//Copy Var
	function copyVar(v){
	    var copyVar = v;
	    return v;
	}
	//Random Posisi Partikel Awal
	function randPosisi(data, par){
	    var randomPos = new Array();
	         for (var i=0; i<par;i++)
	         {
	         randomPos[i] = [];
	         	for (var j=0; j < data.length ; j++) {
	                randomPos[i][j] = Math.random();
	                }
	         }
	     return randomPos;
	}
	//Random Kecepatan Awal
	function randKecepatan(data,par){
	    var randomKec = new Array();
	        for (var i=0; i<par;i++)
	        {
	        randomKec[i] = [];
	         	for (var j=0; j < data.length ; j++) {
	                randomKec[i][j] = Math.random();
	                }
	        }
	     return randomKec;
	}
	//Konversi pengkodean TSP populasi
	function pengkodeanPopulasi(pos){
		var urutan = new Array();
		//Pencocokan Posisi
		for(var i=0; i<pos.length;i++){
			urutan[i]=pengkodean1Partikel(pos[i]);

		}
		return urutan;
	}
	//Konversi pengkodean TSP 1 partikel
	function pengkodean1Partikel(par){
		var dummy = copyV(par);
		var urutan = new Array();
		//Sorting
		dummy.sort();
		//Pencocokan Posisi
		for(var i=0; i<par.length;i++){
			 for(var j=0; j<par.length;j++){
				if(par[i]==dummy[j]){
					urutan[i]=j;
				 }
			}
		}
		return urutan;
	}
	//Perhitungan fitness populasi
	function hitungFitnessPopulasi(data,ur){
		var fit = new Array();
		for (var i=0;i<ur.length;i++){
			fit[i]=hitungFitness1Partikel(data,ur[i]);
		}
		return fit;
	}
	//Perhitungan fitness 1 partikel
	function hitungFitness1Partikel(data,ur){
		var sum = 0;
		for (var i=0;i<ur.length-1;i++){
			sum += data[ur[i]][ur[i+1]];
		}
		sum += data[ur[ur.length-1]][ur[0]];
		return sum;
	}
	//Perhitungan Pbest
	function hitungPbest(pbes,pos,fit){
		var pb = copyD(pbes);
		for(var i=0;i<fit.length;i++){
			if(pbes[i][0] > fit[i]){
				pb[i][0]=fit[i];	
				for(var j=0;j<pos[0].length;j++){
					pb[i][j+1]=pos[i][j];
				}
			}
		}
		return pb;
	}
	//Perhitungan Gbest
	function hitungGbest(pbes){
    	var min = Infinity;
    	var gb = new Array();
    	for(var i=0;i<pbes.length;i++){
    		if (pbes[i][0] < min) {
            	min = pbes[i][0];	
            	gb=pbes[i];	
    		}
    	}
    	return gb;
	}
	//Hitung kecepatan partikel
	function updateKecepatan(pos,kec,gbes,pbes,inertiaW){
		var kb = new Array();
		for(var i=0;i<kec.length;i++){
			kb[i]=[];
			for(var j=0;j<kec[0].length;j++){
				var hit = inertiaW*kec[i][j]+c1*r1*(pbes[i][j+1]-pos[i][j])+c2*r2*(gbes[j+1]-pos[i][j]);
				kb[i][j]=hit;
			}
		}
		return kb;
	}
	//Hitung posisi partikel
	function updatePosisi(kec,pos){
		var posb = new Array();
		for(var i=0;i<kec.length;i++){
			posb[i]=[];
			for(var j=0;j<kec[0].length;j++){
				posb[i][j]=kec[i][j]+pos[i][j];
			}
		}
		return posb;
	}
	//r  nilai = akar(r*r/data.length)   mathrandom*nilai*2-nilai
	//MPSO
	function modifiedStep(data,pos,fit,inertiaW){
		var posi=copyD(pos);
		var fitn=copyV(fit);
		//1 Max Fitness
		var savePos=0;
   		var max = -Infinity;
    	for(var a=0;a<fitn.length;a++){
    		if (fitn[a] > max) {
        	    max = fitn[a];
        	    savePos=a;
        	}
  		}
  		//2 Create 1 Particle
  		var newP = new Array();
	       	for (var i=0; i < data.length ; i++) {
	            newP[i] = Math.random();
	            }
  		//3 Hitung fitness 1 Particle
  		var urut = pengkodean1Partikel(newP);
		var fitpar = hitungFitness1Partikel(data,urut);
		//4 Evaluate
		if(max>fitpar){
			for(var j=0;j<pos[0].length;j++){
				posi[savePos][j]=newP[j];
			}
		}
		else{
			//5 buatPosisiR
			var value = Math.sqrt(inertiaW*inertiaW/pos[0].length);
	        for (var k=0; k< pos[0].length ; k++) {
	            var acak = Math.random()*value*2-value;
	            posi[savePos][k] += acak; 
	        }
		}
		return posi;
	}
	//Konversi pengkodean TSP Gbest
	function urutanGBest(par){
		var dummy = bubbleSortGbest(par);
		var urutan = new Array();
		//Pencocokan Posisi
		for(var i=1; i<par.length;i++){
			for(var j=1; j<par.length;j++){
				if(par[i]==dummy[j]){
					urutan[i-1]=j;
				}
			}
		}
		return urutan;
	}
	//Sorting Array Gbest
	function bubbleSortGbest(array) {
	  	var done = false;
	  	var arrayret = copyV(array);
	  	while (!done) {
	    	done = true;
	   		for (var i = 2; i < arrayret.length;i++) {
	     		if (arrayret[i - 1] > arrayret[i]) {
	     			done = false;
	  			    var tmp = arrayret[i - 1];
	     			arrayret[i - 1] = arrayret[i];
	     			arrayret[i] = tmp;
	      		}
	    	}
	  	}
	 return arrayret;
	}
	//Random R
	function randomingr1r2(){
		r1=Math.random();
		r2=Math.random();
		if(r1+r2>1){
			randomingr1r2();
		}
	}

	function nilaiPenyebut(th, a, b, data){
		 var np = new Array();
		 var sum = 0;
		 var x = 0;
		 var y = 0;
		 var z = 0;
		 			           	var tot = 0;

	         for (var i=0; i<data.length;i++)
	         {
	         np[i] = [];
	         	for (var j=0; j < data.length ; j++) {
	         		if(i!=j){
	         			// x = Math.pow(th,a);
	         			// y = Math.pow((1/data[i][j]),b)
	         			sum = Math.pow(th,a) * Math.pow((1/data[i][j]),b);
			           	tot += sum
			           		         	         			// console.log(tot)
	         		}
	            }
	            			           	np[i][1] = tot
	            			           	np[i][0] = i
	            			           	tot = 0;

	         }

	     return np;
	}

	function sortPenyebut(rs,np){
		
		var copyRS = new Array();
		for (var i = 0; i < np.length; i++) {
			copyRS [i] = [];
			for (var j = 0; j < np.length; j++) {
				if(rs[0][i] == np[j][0]){
					copyRS[i][1] = np[j][1];
					copyRS [i][0] = rs[0][i]
				}


			}
		}
		return copyRS;

	}

	function urutanKota(th,a,b,copyRS,data,randurt) {
		console.log(copyRS);
		var jalur = [];
		var jalurKota = [];
		var bilrandom = [];
		var sum = 0;
		var sum2 = 0;
		var sum3 = 0;
		var sum4 = 0;
		var cek = 0;

			for (var i = 0; i < data.length; i++) {
				jalur [i] = [];
							
				bilrandom [i]= [];
			for (var j = 0; j < data.length; j++) {
				if(j==randurt[0][i])
				{
					sum = 0;
					jalur[i][j]=sum;
				}
				else
					{
					sum = (Math.pow(th,a)*Math.pow((1/data[randurt[0][i]][j]),b))/copyRS[randurt[0][i]][1];

					jalur[i][j] = sum;
					
					}
					
				}
				
			}

			
			for (var i = 0; i < data.length; i++) {
				jalurKota[i]=[];

				jalurKota[0][i]=randurt[0][i];
			
								
			}
			
			for (var h = 1; h < data.length; h++) {
				console.log(jalurKota);

				for (var i = 0; i < data.length; i++) {

					for (var m = 0; m < data.length; m++) {
						if(jalur[i][m]!=0) {
							var tmprandom = Math.random();							
							bilrandom[i] =tmprandom;
							console.log(jalur[i][m])
							console.log(bilrandom[i]);

						if (jalur[i][m]> bilrandom[i]) {
							bilrandom[i]=bilrandom[i]+jalur[i][m];
							console.log(bilrandom[i]);
							m = m+data.length;

						}
						m = m+data.length;
					}
				}
				console.log(bilrandom)

				for (var j = 0; j < data.length; j++) {
				console.log("AA"+ i+"dan"+j)
				if((jalur[i][j]!=0) && ((sum2 + jalur[i][j])<bilrandom[i]) && (j!=(data.length-1))){
					cek = j;
					sum2 = sum2 + jalur[i][j];
					console.log("SATU")
					console.log(jalur[i][j])
				}

				else if(((sum2+jalur[i][j])>bilrandom[i])&& (j!=(data.length-1))){
					console.log(jalur[i][cek])
					console.log(cek)
					jalurKota[h][i]=cek;
					sum2 = 0;
					jalur[i][cek]=sum2;
					console.log(jalur[i][cek])
					j = j+data.length;
					console.log("DUA")
					console.log(jalur)
					
				}
				else if(j==data.length-1 && jalur[i][j]!=0){
					cek = j;
					jalur[i][j]=0;
					jalurKota[h][i]=cek;
					sum2 = 0;
					console.log("TIGA")	
					console.log(jalur[i][j])	
						}

				else if(j==data.length-1 && jalur[i][j]==0){					
					jalur[i][cek]=0;
					jalurKota[h][i]=cek;
					sum2 = 0;
					console.log("EMPAT")	
					console.log(jalur[i][cek])	
						} 	

				else console.log("LIMA")

					}
					
				for (var k = 0; k < data.length; k++) {
					
				if(jalur[i][k]!=0)
				{	console.log(jalur[i][k]+"HH"+k);
					console.log(copyRS[jalurKota[h][i]][1]);
					console.log([jalurKota[h][i]]+"dan"+k+"dan"+h);
					console.log(data[jalurKota[h][i]][k]);
					sum3 = (Math.pow(th,a)*Math.pow((1/data[jalurKota[h][i]][k]),b))/copyRS[jalurKota[h][i]][1];
					jalur[i][k] = sum3;
					console.log(jalur[i][k]+"JJ"+k);
						}
				
					
					}
				}

					
			
			}


					console.log(bilrandom);
					console.log(jalurKota);
		
			
			
		console.log(jalur);
			return jalur;
		}

	

	// function acakSemut()