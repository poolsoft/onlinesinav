// Soru işlemleri menüsü ve alt menülerine ait kodlar

$(document).delegate(".btnIptal:not(#temizle_2)","click",function(){window.location.href='yonetimAnasayfa.php'});

//Soru Listele
$(document).delegate("#soruListele_3","click",function(e) {
	var msg = "";
	
	if ($("#bolum_3 option:selected").val()>0){
		if ($("#ders_3 option:selected").val()>0){
			if ($("#paylasimTuru_3 option:selected").val()>0){
				$.ajax({
						type	: 'POST',
						data	: 'a='+$("#bolum_3 option:selected").val()+'&b='+$("#ders_3 option:selected").val()+'&c='+$("#paylasimTuru_3 option:selected").val(),
						url		: 'actions/sorulariListele_3.php',
						cache	: 'false',
						success	: function(a){							
									$("#sorular_3_container").html(a);		
									$("#soruListesiGosterme_3").slideDown(250);												
						},
						error	:function(x,e){
								if(x.status==0){
									msg='Bağlantı kurulamadı!<br/> İnternet bağlantınızı kontrol edin.';
								}else if(x.status==404){
									msg='İstenen URL bulunamadı.';
								}else if(x.status==500){
									msg='Sunucu hatası.';
								}else if(e=='parsererror'){
									msg='Hata.<br/>JSON isteği gerçekleştirilemedi.';
								}else if(e=='timeout'){
									msg='İstek zaman aşımı.';
								}else {
									msg='Hata.<br/>'+x.responseText;
								}
								$.Zebra_Dialog(msg, {'type': 'error','title':'Hata'});
								$this.fadeIn(500);
								$(".bekleyiniz").remove();
						}
				});	
			}else{
				msg = "Paylaşım türünü seçiniz.";	
			}
		}else{
			msg = "Ders seçiniz.";	
		}
	}else{
		msg = "Bölüm seçiniz.";	
	}
	if (msg) {$.Zebra_Dialog(msg, {'type': 'error','title':'Hata'});return false;}
});

//Soru Ekle
var ekle_2 = '<div id="ekle" class="altSayfaFormAlaniBilgiSatiri"><div class="altSayfaFormSoruAlani">Seçenek Sayısı : </div><div class="altSayfaFormCevapAlani"><select id="secenekSayisi" name="secenekSayisi"><option value="0">Seçiniz</option><option value="4">4</option><option value="5">5</option></select></div><div class="altSayfaFormAciklamaAlani">Sorulardaki seçenek sayısını seçiniz.</div></div>';

$(document).delegate("#soruTuru,#soruTuru_5,#soruTuru_8","change",function(){
	$.blockUI({ message: "<div class='bekleyiniz' align='center'><span><img src='img/loader.gif'></span><span>İşleminiz Gerçekleştiriliyor. Lütfen Bekleyiniz...</span></div>" });
	if ($(this).val()==1){
		$(this).parent("div").parent("div").after(ekle_2);
		$("#ekle").hide().slideDown(500);
	}else{
		$("#ekle").slideUp(500,function(){$(this).remove()});	
	}
	$.unblockUI();
});


$(document).delegate("#bolum_2","change", function(){
	$.blockUI({ message: "<div class='bekleyiniz' align='center'><span><img src='img/loader.gif'></span><span>İşleminiz Gerçekleştiriliyor. Lütfen Bekleyiniz...</span></div>" });
	var v = $(this).val();
	if (v>0){
		$.post('actions/dersleriGetir_2.php',{a:v},function(data){$("#da2").html(data);$("#dersAlani_2").slideDown(500);$.unblockUI();});	
	}
});


$(document).delegate("#btnOnaySoruEkle_2","click",function(){
	var msg = '';
	if ($("#bolum_2 option:selected").val()>0){
		if ($("#dersler_2 option:selected").val()>0){
				if ($("#soruSekli option:selected").val()>0){
					if ($("#soruTuru option:selected").val()>0){
							if ($("#soruTuru option:selected").val()==1){
								if ($("#secenekSayisi option:selected").val()>0){
										$.blockUI({ message: "<div class='bekleyiniz' align='center'><span><img src='img/loader.gif'></span><span>İşleminiz Gerçekleştiriliyor. Lütfen Bekleyiniz...</span></div>" });
										$.ajax({
													type	: 'POST',
													data	: $("#soruEkleForm_2").serialize(),
													url		: 'actions/soruEklemeFormunuGetir_2.php',
													cache	: 'false',
													success	: function(a){
															$("#altSayfaFormAlani_2").html(a);
															$("#gizliBolum_2").fadeIn(300);
															$.unblockUI();
													},
													error	:function(x,e){
															if(x.status==0){
																msg='Bağlantı kurulamadı!<br/> İnternet bağlantınızı kontrol edin.';
															}else if(x.status==404){
																msg='İstenen URL bulunamadı.';
															}else if(x.status==500){
																msg='Sunucu hatası.';
															}else if(e=='parsererror'){
																msg='Hata.<br/>JSON isteği gerçekleştirilemedi.';
															}else if(e=='timeout'){
																msg='İstek zaman aşımı.';
															}else {
																msg='Hata.<br/>'+x.responseText;
															}
															$.Zebra_Dialog(msg, {'type': 'error','title':'Hata'});
															$this.fadeIn(500);
															$(".bekleyiniz").remove();
													}
									});
								}else{
									msg = "Seçenek sayısını seçiniz.";	
								}	
							}
					}else{
						msg = "Soru türünü seçiniz.";	
					}
				}else{
					msg = "Soru şeklini seçiniz.";	
				}
		}else{
			msg = "Ders seçiniz.";
		}
	}else{
		msg = "Bölüm seçiniz.";
	}
	if (msg!='') $.Zebra_Dialog(msg, {'type': 'error','title':'Hata'});
});




//2.php Soru Ekle -> Soruyu Kaydet Butonu
$(document).delegate("#btnOnaySoruKaydet_2","click",function(){
		var dil 		= $("#pDil option:selected").val(),
			kod 		= encodeURIComponent($.trim($("#code").val())),
			sorumetni 	= $.trim($("#soruMetni_2").val()),
			secA		= $.trim($("#secA").val()),
			secB		= $.trim($("#secB").val()),
			secC		= $.trim($("#secC").val()),
			secD		= $.trim($("#secD").val()),
			dogrucevap	= $("#dogruCevap_2").val(),
			sorubilgisi = $("#soruBilgisi_2").val()
			msg			= '';
			
		if (dil>0){
			if (kod!=''){
				if (sorumetni != ''){
					if (secA != ''){
						if (secB != ''){
							if (secC != ''){
								if (secD != ''){
									if (dogrucevap != 0){
											$.blockUI({ message: "<div class='bekleyiniz' align='center'><span><img src='img/loader.gif'></span><span>İşleminiz Gerçekleştiriliyor. Lütfen Bekleyiniz...</span></div>" });
											$.ajax({
													type	: 'POST',
													data	: 'a='+dil+'&b='+kod+'&c='+sorumetni+'&d='+secA+'&e='+secB+'&f='+secC+'&g='+secD+'&h='+dogrucevap+'&i='+sorubilgisi,
													url		: 'actions/tekTekSoruKaydet_2.php',
													cache	: 'false',
													success	: function(a){
														$.Zebra_Dialog(a, {'type': 'information','title':'Bilgi'});
														
														$.unblockUI();
													}
											});	

									}else{
										msg = "Doğru cevabı seçiniz.";
									}
								}else{
									msg = "D seçeneğini giriniz.";
								}
							}else{
								msg = "C seçeneğini giriniz.";
							}
						}else{
							msg = "B seçeneğini giriniz.";
						}
					}else{
						msg = "A seçeneğini giriniz.";
					}
				}else{
					msg = "Soru metnini giriniz.";
				}
			}else{
				msg = "Kodları giriniz.";
			}
		}else{
			msg = "Programlama dilini seçiniz.";	
		}
		
		if (msg != '')$.Zebra_Dialog(msg, {'type': 'error','title':'Hata'});
});

//2.php Soru Ekle -> Soru Alanını Temizle Butonu
$(document).delegate("#temizle_2","click",function(){
	$("#code").val("");
	$("#soruMetni_2").val("");
	$("#secA,#secB,#secC,#secD").val("");
	$("#dogruCevap_2").val("0");
});
	
	
//Excel'den soru aktar

$(document).delegate("#bolum_5","change", function(){
	var v = $(this).val();
	if (v>0){
		$.post('actions/dersleriGetir_5.php',{a:v},function(data){$("#da5").html(data);$("#dersAlani_5").slideDown(500);});	
	}
});

$(document).delegate("#dersler_5","change", function(){
	var v = $(this).val();
	if (v>0){
		$.post('actions/soruTurleriniGetir_5.php',{a:v},function(data){$("#st5").html(data);$("#soruTuruAlani_5").slideDown(500);});	
	}
});

$(document).delegate("#btnOnaySoruYukle_5","click", function(){
	var msg = "";
	
	if ($("#bolum_5 option:selected").val()==0) {
		msg = "Bölümü seçiniz.";
	}else{
		if ($("#dersler_5 option:selected").val()==0) {
			msg = "Ders seçiniz.";
		}else{
			if ($("#soruTuru_5 option:selected").val()==0) {
				msg = "Soru türü seçiniz.";
			}
		}
	}
	
	if (!msg){
		if ($("#soruTuru_5 option:selected").val()==1) {
			if ($("#secenekSayisi option:selected").val()==0) msg = "Seçenek sayısını seçiniz.";
		}else{
			msg = "Sisteme şuanda yalnızca test sorusu yüklenmektedir.";	
		}
	}
	
	if (msg) {
		$.Zebra_Dialog(msg, {'type': 'error','title':'Hata'});return false;
	}else{
		var content = "<input type='hidden' id='bilgi_5' name='bilgi_5' value='"+$("#bolum_5 option:selected").val()+"-"+$("#dersler_5 option:selected").val()+"-"+$("#soruTuru_5 option:selected").val()+"-"+$("#secenekSayisi option:selected").val()+"'/>";
		$("#bilgi_5").remove();
		$("#testSoruYukleForm").append(content);
		$("#gizliBolum_5").slideDown("slow");
	}
});

//Excel dosyası yükleme [Test Sorular]
	$(document).delegate("#btnOnayTestSoruYukle","click",function(e) {
        
		 var ext = $('#testSoruYukle_5').val().split('.').pop().toLowerCase();
		 if($.inArray(ext, ['xls','xlsx']) == -1) {
			$.Zebra_Dialog("Hatalı dosya türü!<br/>Yalnızca EXCEL dosyaları yükleyebilirsiniz.", {'type': 'error','title':'Hata'});return false;
		 }
		 
		 var bar = $('.bar');
		 var percent = $('.percent');
		 var status = $('#status');


		 $('form#testSoruYukleForm').submit(function(){
				$('form#testSoruYukleForm').ajaxForm({
						delegation: true,
						beforeSend: function() {
							status.empty();
							var percentVal = '0%';
							bar.width(percentVal)
							percent.html(percentVal);
						},
						uploadProgress: function(event, position, total, percentComplete) {
							var percentVal = percentComplete + '%';
							bar.width(percentVal)
							percent.html(percentVal);
						},
						complete: function(xhr) {
							$("#altSayfaFormAlani_5").append(xhr.responseText);
							$("#altSayfaButonAlani_5").remove();
							return false;
						}
				});
		 });
    });
	
$(document).delegate("#btn_test_Sorulari_Kaydet_5","click",function(e) {
		var $this = $(this);
		$this.fadeOut(500).after("<div class='bekleyiniz' align='center'><span><img src='img/loader.gif'></span><span>İşleminiz Gerçekleştiriliyor. Lütfen Bekleyiniz...</span></div>");
		$.ajax({
						type	: 'POST',
						data	: 'bilgi_5='+$("#bilgi_5").val(),
						url		: 'actions/testSorulariKaydet.php',
						cache	: 'false',
						success	: function(a){
							$.Zebra_Dialog(a, {
										'type':     'information',
										'title':    'Bilgi',
										'buttons':  ['Tamam'],
										'onClose':  function(caption) {
											if (caption == 'Tamam'){
												$.ajax({
														type	: 'POST',
														url		: 'pages/5.php',
														data	: '',
														success	: function(a){
															$("div#icerik").html(a).hide().fadeIn(800);	
														}
												});
											}
										}
									});
						},
						error	:function(x,e){
								if(x.status==0){
									msg='Bağlantı kurulamadı!<br/> İnternet bağlantınızı kontrol edin.';
								}else if(x.status==404){
									msg='İstenen URL bulunamadı.';
								}else if(x.status==500){
									msg='Sunucu hatası.';
								}else if(e=='parsererror'){
									msg='Hata.<br/>JSON isteği gerçekleştirilemedi.';
								}else if(e=='timeout'){
									msg='İstek zaman aşımı.';
								}else {
									msg='Hata.<br/>'+x.responseText;
								}
								$.Zebra_Dialog(msg, {'type': 'error','title':'Hata'});
								$this.fadeIn(500);
								$(".bekleyiniz").remove();
						}
		});	

});





