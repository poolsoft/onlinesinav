<?php
	require_once("../class/connect.php");
require_once("headerPage.php");
	$buSayfa	= basename(__FILE__,".php");
	$yetkiler	= explode("-",$_SESSION["gecerliKullanici"]["charges"]);
	if (!in_array($buSayfa,$yetkiler)) {
		$_SESSION["gecerliKullanici"]["ygd"]++;
		header("location: ../yonetimAnasayfa.php?ygd=".$_SESSION["gecerliKullanici"]["ygd"]);
		exit();	
	}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
</head>

<body>
<div id="altSayfaContainer">
    		<div class="altSayfaBolum">
            		<div class="altSayfaBaslikSeviye1">Sınav Raporları : </div>
                    <div class="altSayfaFormAlani">   
                    <form id="form_10" > 
                            <div class="altSayfaFormAlaniBilgiSatiri">
                            		<div class="altSayfaFormSoruAlani">Sınav : </div>
                                    <div class="altSayfaFormCevapAlani">
                                    	<select id="sinav_12" name="sinav_12">
                                        		<option value="0">Seçiniz</option>
                                                <?php
													$q = mysql_query("SELECT sinavlar.id, sinavlar.sinavTarihi, sinavlar.sinavSaati, sinifseviyeleri.seviye, dersler.dersAdi, ogretimturu.tur FROM sinavlar INNER JOIN dersler ON dersler.id = sinavlar.ders INNER JOIN ogretimturu ON ogretimturu.tur = sinavlar.ogretimTuru INNER JOIN sinifseviyeleri ON sinifseviyeleri.id = sinavlar.seviye WHERE ogretimGorevlisi = '".$_SESSION['gecerliKullanici']['userId']."' AND sinavDegerlendirmeDurumu = 1 AND donem = (SELECT id FROM donemler WHERE aktif = 1) AND ogretimYili = (SELECT id FROM ogretimyili WHERE aktif = 1)");
													while($al = mysql_fetch_object($q)){
														echo "<optgroup label='$al->sinavTarihi - $al->sinavSaati - $al->tur $al->seviye'>
																<option value='".$al->id."'>".$al->dersAdi."</option>
															  </optgroup>";	
													}
												?>
                                        </select>
                                    </div>
                                    <div class="altSayfaFormAciklamaAlani">Sınavı seçiniz.</div>
                            </div>
                            <div class="altSayfaFormAlaniBilgiSatiri">
                            		<div class="altSayfaButonAlani">
                                    	<div class="btnOnay" id="btnOnaySinavRaporlari_12">
                                        	<span class="img"><img src="img/confirmation.png" width="32" height="32" /></span>
                                            <span class="text"><a href="javascript:;">Tamam</a></span>
                                        </div>
                                        <div class="btnIptal">
                                        	<span class="img"><img src="img/error.png" width="32" height="32" /></span>
                                            <span class="text"><a href="javascript:;">İptal</a></span>
                                        </div>  
                                    </div>
                            </div>
                    </form>        
                    </div>
                    <div id="sinavRaporListesi_12" style="display:none">
                        <div class="altSayfaBaslikSeviye1">Sınav Evrakları : </div>
                        <div id="sinavRaporlari_12_container"></div>
                    </div>
            </div>
            <div class="temizle"></div>
    </div>
</body>
</html>