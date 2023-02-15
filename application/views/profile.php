<?php $this->session->set_userdata('sitenow', $this->uri->segment(1)); ?>
<input type="hidden" id="basepath" value="<?= base_url() ?>">
<div id="profile" class="pe-4 d-block mt-2">
    <span class="dropdown">
        <div class="dropdown">
            <div style="text-decoration: none;" class=" fs-4 text-white fw-bold me-4 d-flex align-items-center curpo zoom-hover nb-shadow bg-transparent">
                <img class="profile-pic" src="<?php echo base_url() ?>assets/img/profile_picture/<?php echo $this->session->userdata['profile']; ?>" alt=""> <span class="d-none d-sm-none d-md-inline d-lg-none d-xl-inline " style="font-style:initial; font-size:0.8rem;font-weight:normal; margin-left:0.5rem;"><?php echo $this->session->userdata['nama']; ?>
            </div>
    </span>
    <ul style="position:absolute;right:0px;margin-top:5px" class="ms-2">
        <li><a href="<?php echo site_url('admin/') ?>">Dashboard</a></li>
        <?php
        if ($this->session->userdata('is_login') == true && $this->session->userdata('id_pks') == '0') {
            echo '<li><a href="'. site_url("admin/lap_invest").'">Progress Lap. Investasi</a></li>
            <li><a href="'. site_url("admin/input_pekerjaan").'">Input Uraian Pekerjaan</a></li>
            <li><a href="'. site_url("admin/update_progress").'">Update Progress</a></li>
            <li><a href="'. site_url("admin/upload_dokumen").'">Upload Dokumen</a></li>
            <li><a href="'. site_url("admin/pengawasan_pekerjaan_lap").'">Pengawasan Pekerjaan Lap.</a></li>
            <li><a href="'. site_url("admin/reset_password").'">Reset Password User</a></li>
            <li><a href="'. site_url("admin/register").'">Tambah User</a></li>';
        }else{
            echo '<li><a href="'. site_url("user/pemesanan_produk").'">Buat Pesanan</a></li>
            <li><a href="'. site_url("user/daftar_pesanan").'">Pesanan Saya</a></li>
            ';
        }
        
        ?>
        
        <li><a href="<?php echo site_url('user/user_profile') ?>">Ubah Profil</a></li>
        <li><a href="<?php echo site_url('home/') ?>">Halaman Utama</a></li>
        <li><a href="<?php echo site_url('user/logout') ?>">Keluar</a></li>
    </ul>
</div>