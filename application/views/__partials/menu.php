<body>
    <div style="overflow:hidden" id="preloader">
        <h2 style="margin-top:34vh" class="title text-light fw-bold text-center">MONI-CEX PTPN IV</h2>
    </div>
  
    <!-- Offcanvas -->
    <div class="offcanvas offcanvas-start rounded offcanvas-bg" tabindex="-1" id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel">
        <div class="offcanvas-header">
            <h1 class="logo me-auto"><a class="text-main" href="<?= base_url('index.php/home/'); ?>">Menu: </a></h1>
            <button style="border: solid 1px white;border-radius: 5px;" type="button" class=" btn text-dark" data-bs-dismiss="offcanvas" aria-label="Close"><i class="bi bi-chevron-left text-dark"></i></button>
        </div>
        <div class="offcanvas-body text-dark">
            <a href="<?= base_url('index.php/home/'); ?>" class="<?php if (isset($m1)) {
                                                                    echo $m1;
                                                                }  ?>">
                <div id="menu-home" class="d-flex align-items-center p-1">
                    <div style="vertical-align: middle;" class="d-table-cell">
                        <span class="bi bi-house-fill fw-bold fs-2"></span><span class="ps-3 fw-bold mb-3">Beranda</span>
                    </div>
                </div>
            </a>
            <a href="<?= base_url('index.php/home/info_produk') ?>" class="<?php if (isset($m2)) {
                                                                    echo $m2;
                                                                }  ?>">
                <div id="menu-info-produk"  class="d-flex align-items-center p-1">
                    <div style="vertical-align: middle;" class="d-table-cell">
                        <span class="bi bi-info-circle-fill fw-bold fs-2"></span><span class="ps-3 fw-bold mb-3">Info
                            Produk</span>
                    </div>
                </div>
            </a>
            <a href="<?= base_url('index.php/home/info_harga') ?>" class="<?php if (isset($m3)) {
                                                                    echo $m3;
                                                                }  ?>">
                <div id="menu-info-harga"  class="d-flex align-items-center p-1">
                    <div style="vertical-align: middle;" class="d-table-cell">
                        <span class="bi bi-tag-fill fw-bold fs-2"></span><span class="ps-3 fw-bold mb-3">Info
                            Harga</span>
                    </div>
                </div>
            </a>
            <a href="<?= base_url('index.php/home/info_stok') ?>" class="<?php if (isset($m4)) {
                                                                    echo $m4;
                                                                }  ?>">
                <div id="menu-info-stok"  class="d-flex align-items-center p-1">
                    <div style="vertical-align: middle;" class="d-table-cell">
                        <span class="bi bi-archive-fill fw-bold fs-2"></span><span class="ps-3 fw-bold pb-2">Info Stok
                            Sparepart</span>
                    </div>
                </div>
            </a><a href="<?= base_url('index.php/home/faq') ?>" class="<?php if (isset($m5)) {
                                                                        echo $m5;
                                                                    }  ?>">
                <div id="menu-faq"  class=" d-flex align-items-center p-1">
                    <div style="vertical-align: middle;" class="d-table-cell">
                        <span class=" bi bi-question-circle-fill fw-bold fs-2"></span><span class="ps-3 fw-bold mb-3">Pertanyaan Umum</span>
                    </div>
                </div>
            </a><a href="<?= base_url('index.php/home/review') ?>"  class="<?php if (isset($m6)) {echo $m6;
                                                                                                            } ?>">
                <div id="menu-review"  id="menu-review" class="d-flex align-items-center p-1 ">
                    <div style="vertical-align: middle;" class="d-table-cell">
                        <span class="bi bi-list-check fw-bold fs-2"></span><span class="ps-3 fw-bold mb-3">Review Produk </span>
                    </div>
                </div>
            </a><a href="<?= base_url('index.php/user/') ?>" class="<?php if (isset($m7)) {
                                                                        echo $m7;
                                                                    }  ?>">
                <div id="menu-admin" id="menu-login" class="d-flex align-items-center p-1 ">
                    <div style="vertical-align: middle;" class="d-table-cell">
                        <span class="bi bi-person-fill fw-bold fs-2"></span><span class="ps-3 fw-bold mb-3">Halaman Admin</span>
                    </div>
                </div>
            </a>
        </div>
    </div>
    <!-- End Offcanvas -->

    <!-- ======= Header ======= -->
    <header style="position: sticky;" id="header" class="header-scrolled ">
        <div style="min-height:3rem;" class="container-fluid pe-2 d-inline-flex justify-content-between">
            <h1 class="logo d-none d-lg-block d-xl-block d-md-none align-items-center "><img src="<?= base_url() ?>assets/img/icons/Logo_PTPN4.png" alt="" sizes="160x160" srcset="" class="me-2"><a class="text-center mt-2 logo-title align-items-center me-5 btm-border fromCenter" href="<?=base_url('index.php/home')?>">MONI-CEX </a></h1>


            <div class="text-center text-light d-inline d-xl-none d-md-inline d-lg-none d-sm-inline ms-xl-5 ms-lg-3">
                <span data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop" class="fs-3 text-dark"><i style="font-weight: bold;" class="bi bi-list text-light pt-3 pb-5"></i></span>
                <span class="ms-1 ps-4 pe-2 fs-2 fw-bold text-center">MONI-CEX </span>
            </div>
            <nav id="navbar" class="navbar">
                <?php
                $type = "";
                if($this->session->userdata('id_pks')==0){
                    $type = "admin";
                }else{
                    $type = "user";
                }
                ?>
                <ul>
                    <li><a href="<?= base_url("index.php/$type") ?>" id="nav-home" class="nav-link <?php if (isset($m1)) {
                                                                                                        echo $m1;
                                                                                                    } ?>">DASHBOARD</a>
                    </li>
                    <li><a href="<?= base_url("index.php/$type/lap_invest") ?>" id="nav-info-produk" class="nav-link <?php if (isset($m2)) {
                                                                                                                            echo $m2;
                                                                                                                        } ?>">PROGRESS LAP. INVESTASI</a></li>
                    <li><a href="<?= base_url('index.php/home/info_harga') ?>" id="nav-info-harga" class="nav-link <?php if (isset($m3)) {
                                                                                                                        echo $m3;
                                                                                                                    } ?>">PENGAWASAN PEKERJAAN LAPANGAN</a></li>
                    
                    <?php if ($this->session->userdata('is_login') == false) {
                        echo "<li><a href=" . site_url('user') . ">Login</a></li>";
                    } ?>
                </ul>
            </nav>
            <!-- .navbar -->
            <div class="">
                <?php if ($this->session->userdata('is_login') == TRUE) {
                    $this->load->view('profile.php');
                } ?>
            </div>
        </div>

    </header>