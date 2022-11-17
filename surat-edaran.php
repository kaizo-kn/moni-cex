<?php 
$page_title='Surat Edaran';
include 'head.php';
?>
<div class="container">
    <div class="text-center mb-5 mt-2">
        <h3 class="text-dark m-4 mb-5">
        Surat Edaran Penetapan 6 Standarisasi dan Penyediaan Stok Komponen Mesin Instalasi PKS di PMT Dolok Ilir
        </h2>
        <img class="mb-3" src="https://www.ptpn4.co.id/wp-content/uploads/2022/11/SE-Penetapan-6-Standarisasi-PMT_page-0001.jpg" alt="" srcset="">
       
        <img src="https://www.ptpn4.co.id/wp-content/uploads/2022/11/SE-Penetapan-6-Standarisasi-PMT_page-0002.jpg" alt="" srcset="">
    </div>
</div>

<?php include 'footer.php' ?>
<script>
$(document).ready(function() {
    var current = 'faq.php'
    console.log(current)
    $('#navbarSupportedContent ul li a').each(function() {
        var $this = $(this);
        // if the current path is like this link, make it active
        if ($this.attr('href').indexOf(current) !== -1) {
            $this.parent().addClass('active');
        } else {
            $this.parent().removeClass('active');
        }
    })
});
</script>