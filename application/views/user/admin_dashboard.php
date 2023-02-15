<body class="section-bg">
  <div class="container section-bg ">
    <div class="h-100">
      <div class="section-title mt-5 ">
        <h2>Halaman Admin PMT</h2>
      </div>
      <section id="info-harga" class="team pt-5">
        <h5 class="subtitle mb-5">
          Selamat datang <?php echo $this->session->userdata('nama');  ?>!
        </h5>
        <h5 class="subtitle mt-4">
          Menu:
        </h5>
        <div class="container mt-2" data-aos="fade-up">
          <div class="row ">
            <div onclick="" class="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-4 zoom-hover  nb-shadow">
              <a href="<?php echo site_url('user/ubah_info_stok') ?>">
                <div style="height:100%" class="member d-flex flex-column align-items-center bg-light p-0 overflow-hidden " data-aos="zoom-in" data-aos-delay="100">
                  <div style="height:25vh" class="p-3 d-flex align-items-center text-start">
                    <i style="font-size: 4rem;" class="bi bi-archive-fill fw-bold text-main mt-3"></i>
                  </div>
                   <div style="height:100%" class="bg-secondary w-100 mt-4 p-3 d-flex align-items-center ">
                    <h5 class="fs-5 fw-bold text-start text-light">Ubah Informasi Stok Sparepart</h5>
                  </div>
                </div>
              </a>
            </div>
            <div onclick="" class="zoom-hover nb-shadow col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-4">
              <a href="<?php echo site_url('user/ubah_info_harga') ?>">
                <div style="height:100%" class="member d-flex flex-column align-items-center bg-light p-0 overflow-hidden" data-aos="zoom-in" data-aos-delay="100">
                  <div style="height:25vh" class="p-3 d-flex align-items-center text-start">
                    <i style="font-size: 4rem;" class="bi bi-tag-fill fw-bold text-main mt-3"></i>
                  </div>
                   <div style="height:100%" class="bg-secondary w-100 mt-4 p-3 d-flex align-items-center ">
                    <h5 class="fs-5 fw-bold text-start text-light">Ubah Informasi Harga</h5>
                  </div>
                </div>
              </a>
            </div>
            
            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-4 zoom-hover nb-shadow ">
              <a href="<?php echo site_url('user/manajemen_review') ?>">
                <div style="height:100%" class="member d-flex flex-column align-items-center bg-light p-0 overflow-hidden" data-aos="zoom-in" data-aos-delay="100">
                  <div style="height:25vh" class="p-3 d-flex align-items-center text-start">
                    <i style="font-size: 4rem;" class="bi bi-card-checklist fw-bold text-main mt-3"></i>
                  </div>
                   <div style="height:100%" class="bg-secondary w-100 mt-4 p-3 d-flex align-items-center ">
                    <h5 class="fs-5 fw-bold text-start text-light">Manajemen Review</h5>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-4 zoom-hover nb-shadow ">
              <a href="<?php echo site_url('user/manajemen_pesanan') ?>">
                <div style="height:100%" class="member d-flex flex-column align-items-center bg-light p-0 overflow-hidden" data-aos="zoom-in" data-aos-delay="100">
                  <div style="height:25vh" class="p-3 d-flex align-items-center text-start">
                    <i style="font-size: 4rem;" class="bi bi-cart-check-fill fw-bold text-main mt-3"></i>
                  </div>
                   <div style="height:100%" class="bg-secondary w-100 mt-4 p-3 d-flex align-items-center ">
                    <h5 class="fs-5 fw-bold text-start text-light">Manajemen Pesanan</h5>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-4 zoom-hover nb-shadow ">
              <a href="<?php echo site_url('user/reset_user') ?>">
                <div style="height:100%" class="member d-flex flex-column align-items-center bg-light p-0 overflow-hidden" data-aos="zoom-in" data-aos-delay="100">
                  <div style="height:25vh" class="p-3 d-flex align-items-center text-start">
                    <i style="font-size: 4rem;" class="ri ri-user-settings-fill fw-bold text-main mt-3"></i>
                  </div>
                   <div style="height:100%" class="bg-secondary w-100 mt-4 p-3 d-flex align-items-center ">
                    <h5 class="fs-5 fw-bold text-start text-light">Reset Password User</h5>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-4 zoom-hover nb-shadow ">
              <a href="<?php echo site_url('user/register') ?>">
                <div style="height:100%" class="member d-flex flex-column align-items-center bg-light p-0 overflow-hidden" data-aos="zoom-in" data-aos-delay="100">
                  <div style="height:25vh" class="p-3 d-flex align-items-center text-start">
                    <i style="font-size: 4rem;" class="bi bi-person-plus fw-bold text-main mt-3"></i>
                  </div>
                   <div style="height:100%" class="bg-secondary w-100 mt-4 p-3 d-flex align-items-center ">
                    <h5 class="fs-5 fw-bold text-start text-light">Tambah User</h5>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-4 zoom-hover nb-shadow ">
              <a href="<?php echo site_url('user/user_profile') ?>">
                <div style="height:100%" class="member d-flex flex-column align-items-center bg-light p-0 overflow-hidden" data-aos="zoom-in" data-aos-delay="100">
                  <div style="height:25vh" class="p-3 d-flex align-items-center text-start">
                    <i style="font-size: 4rem;" class="bi bi-person-circle fw-bold text-main mt-3"></i>
                  </div>
                   <div style="height:100%" class="bg-secondary w-100 mt-4 p-3 d-flex align-items-center ">
                    <h5 class="fs-5 fw-bold text-start text-light">Ubah Profil</h5>
                  </div>
                </div>
              </a>
            </div>
            <div onclick="" class="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-4 zoom-hover nb-shadow">
              <a href="<?php echo site_url('home/') ?>">
                <div style="height:100%" class="member d-flex flex-column align-items-center bg-light p-0 overflow-hidden" data-aos="zoom-in" data-aos-delay="100">
                  <div style="height:25vh" class="p-3 d-flex align-items-center text-start">
                    <i style="font-size: 4rem;" class="bi bi-house fw-bold text-main mt-3 zoom-hover nb-shadow"></i>
                  </div> 
                  <div style="height:100%" class="bg-secondary w-100 mt-4 p-3 d-flex align-items-center ">
                    <h5 class="fs-5 fw-bold text-start text-light">Halaman Utama</h5>
                  </div>
                </div>
              </a>
            </div>
            
            <div onclick="" class="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-4 zoom-hover nb-shadow">
              <a href="<?php echo site_url('user/logout') ?>">
                <div style="height:100%" class="member d-flex flex-column align-items-center bg-light p-0 overflow-hidden" data-aos="zoom-in" data-aos-delay="100">
                  <div style="height:25vh" class="p-3 d-flex align-items-center text-start">
                    <i style="font-size: 4rem;" class="bi bi-power fw-bold text-danger mt-3 zoom-hover nb-shadow"></i>
                  </div> 
                  <div style="height:100%" class="bg-secondary w-100 mt-4 p-3 d-flex align-items-center ">
                    <h5 class="fs-5 fw-bold text-start text-light">Log Out</h5>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>