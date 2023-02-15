<?php
defined('BASEPATH') or exit('No direct script access allowed');


class Admin extends CI_Controller
{

   public function __construct()
   {
      parent::__construct();
      $this->load->helper(array('url', 'directory'));
      $this->load->model('m_admin');
   }


   public function index()
   {
      if ($this->session->userdata('is_login') == TRUE && $this->session->userdata('id_pks') == '0') {
         $data = array('progress_0' => 3, 'progress_40' => 3, 'progress_60' => 3, 'progress_99' => 3, 'progress_100' => 3, 'progress_pks' => 3, 'progress_tekpol' => 3, 'progress_hps' => 3, 'progress_pengadaan' => 3, 'keluar_sppbj' => 3);
         $total = 0;
         foreach ($data as $key => $value) {
            $total += $value;
         }
         $this->load->view('__partials/header.php', array('page_title' => 'Dashboard'));
         $this->load->view('__partials/menu.php', array('m1' => 'nav-menu-active'));
         $this->load->view('admin/dashboard.php', array_merge($data, array('total_pekerjaan' => $total)));
         $this->load->view('__partials/footer.php');
      } else {
         redirect('login', 'refresh');
      }
   }
   public function lap_invest()
   {
      if ($this->session->userdata('is_login') == TRUE && $this->session->userdata('id_pks') == '0') {
         $data = array('progress_0' => 3, 'progress_40' => 3, 'progress_60' => 3, 'progress_99' => 3, 'progress_100' => 3, 'progress_pks' => 3, 'progress_tekpol' => 3, 'progress_hps' => 3, 'progress_pengadaan' => 3, 'keluar_sppbj' => 3);
         $total = 0;
         foreach ($data as $key => $value) {
            $total += $value;
         }
         $this->load->view('__partials/header.php', array('page_title' => 'Progress Lap. Investasi'));
         $this->load->view('__partials/menu.php', array('m2' => 'nav-menu-active'));
         $this->load->view('admin/lap_invest', array_merge($data, array('total_pekerjaan' => $total)));
         $this->load->view('__partials/footer.php');
      } else {
         redirect('login', 'refresh');
      }
   }
   public function input_pekerjaan()
   {
      if ($this->session->userdata('is_login') == TRUE && $this->session->userdata('id_pks') == '0') {
         $data = $this->db->query('SELECT id_pks,nama_pks from daftar_nama_pks where id_pks > 0 order by nama_pks asc')->result_array();
         $this->load->view('__partials/header.php', array('page_title' => 'Progress Lap. Investasi'));
         $this->load->view('__partials/menu.php', array('m2' => 'nav-menu-active'));
         $this->load->view('admin/input_uraian_pekerjaan.php', array('data_pks' => $data));
         $this->load->view('__partials/footer.php');
      } else {
         redirect('login', 'refresh');
      }
   }
   public function update_progress()
   {
      if ($this->session->userdata('is_login') == TRUE && $this->session->userdata('id_pks') == '0') {
         $data = $this->db->query('SELECT id_pks,nama_pks from daftar_nama_pks where id_pks > 0 order by nama_pks asc')->result_array();
         $this->load->view('__partials/header.php', array('page_title' => 'Progress Lap. Investasi'));
         $this->load->view('__partials/menu.php', array('m2' => 'nav-menu-active'));
         $this->load->view('admin/update_progress.php', array('data_pks' => $data,'data_pekerjaan'=>$data));
         $this->load->view('__partials/footer.php');
      } else {
         redirect('login', 'refresh');
      }
   }
   public function upload_dokumen()
   {
      if ($this->session->userdata('is_login') == TRUE && $this->session->userdata('id_pks') == '0') {
         $data = $this->db->query('SELECT id_pks,nama_pks from daftar_nama_pks where id_pks > 0 order by nama_pks asc')->result_array();
         $this->load->view('__partials/header.php', array('page_title' => 'Progress Lap. Investasi'));
         $this->load->view('__partials/menu.php', array('m2' => 'nav-menu-active'));
         $this->load->view('admin/upload_dokumen.php', array('data_pks' => $data,'data_pekerjaan'=>$data));
         $this->load->view('__partials/footer.php');
      } else {
         redirect('login', 'refresh');
      }
   }
   public function pengawasan_pekerjaan_lap()
   {
      if ($this->session->userdata('is_login') == TRUE && $this->session->userdata('id_pks') == '0') {
         $data = $this->db->query('SELECT id_pks,nama_pks from daftar_nama_pks where id_pks > 0 order by nama_pks asc')->result_array();
         $this->load->view('__partials/header.php', array('page_title' => 'Progress Lap. Investasi'));
         $this->load->view('__partials/menu.php', array('m3' => 'nav-menu-active'));
         $this->load->view('admin/pengawasan_pekerjaan_lap.php', array('data_pks' => $data,'data_pekerjaan'=>$data));
         $this->load->view('__partials/footer.php');
      } else {
         redirect('login', 'refresh');
      }
   }
   public function info_harga()
   {
      $data = $this->m_home->m_get_catatan();
      $this->load->view('main/header.php', array('page_title' => 'Informasi Harga Produk PMT'));
      $this->load->view('main/menu.php', array('m3' => 'nav-menu-active'));
      $this->load->view('main/info_harga.php', $data);
      $this->load->view('main/footer.php');
      if ($this->session->userdata('is_login') == true) {
         $this->session->set_userdata(array('sitenow' => 'home/info_harga'));
      }
   }
   public function info_stok()
   {


      $info_stok = $this->m_home->m_get_stok();
      $this->load->view('main/header.php', array('page_title' => 'Informasi Stok Produk PMT'));
      $this->load->view('main/menu.php', array('m4' => 'nav-menu-active'));
      $this->load->view('main/info_stok.php', $info_stok);
      $this->load->view('main/footer.php');
   }


   public function faq()
   {
      $this->load->view('main/header.php', array('page_title' => 'Pertanyaan Umum'));
      $this->load->view('main/menu.php', array('m5' => 'nav-menu-active'));
      $this->load->view('main/faq.php');
      $this->load->view('main/footer.php');
      if ($this->session->userdata('is_login') == true) {
         $this->session->set_userdata(array('sitenow' => 'home/faq'));
      }
   }

   public function review()
   {
      $data_review = $this->m_home->m_get_data_review();
      $this->load->view('main/header.php', array('page_title' => 'Halaman Review Produk'));
      $this->load->view('main/menu.php', array('m6' => 'nav-menu-active'));
      $this->load->view('main/review.php', array('data_review' => $data_review));
      $this->load->view('main/footer.php');
      if ($this->session->userdata('is_login') == true) {
         $this->session->set_userdata(array('sitenow' => 'home/review'));
      }
   }

   public function get_json_data()
   {
      $id_pesanan = $this->input->post('id_pesanan');
      echo $this->m_home->m_get_json_data($id_pesanan);
   }

   //Rmdir
   function deleteDirectory($dir)
   {
      if (!file_exists($dir)) {
         return true;
      }

      if (!is_dir($dir)) {
         return unlink($dir);
      }

      foreach (scandir($dir) as $item) {
         if ($item == '.' || $item == '..') {
            continue;
         }

         if (!$this->deleteDirectory($dir . DIRECTORY_SEPARATOR . $item)) {
            return false;
         }
      }

      return rmdir($dir);
   }



   //Buat Review
   public function c_add_review()
   {
      $path = "";
      $message = "";
      $title = $this->filter_input($this->input->post('judul'));
      $name = $this->filter_input($this->input->post('nama'));
      $review = $this->filter_input($this->input->post('review'));
      $timestamp = $this->getTimestamp();
      if (!empty($_FILES['files']['name']) && count(array_filter($_FILES['files']['name'])) > 0) {
         $date = date("Y-m-d_H-i-s");
         $sname = substr(str_replace(" ", "", $name), 0, 5);
         $microtime = str_replace('.', '-', microtime(true));
         $folder = $sname . "_" . $microtime;
         $path = FCPATH . 'media/upload/review/' . $folder;
         if (!is_dir($path)) {
            mkdir($path, 0755, TRUE);
         }
         $filesCount = count($_FILES['files']['name']);
         for ($i = 0; $i < $filesCount && $i < 4; $i++) {
            $_FILES['file']['name']     = $_FILES['files']['name'][$i];
            $_FILES['file']['type']     = $_FILES['files']['type'][$i];
            $_FILES['file']['tmp_name'] = $_FILES['files']['tmp_name'][$i];
            $_FILES['file']['error']     = $_FILES['files']['error'][$i];
            $_FILES['file']['size']     = $_FILES['files']['size'][$i];

            // File upload configuration 
            $file = $sname . "_" . $date . "_" . $i;
            $config['upload_path']          = $path;
            $config['allowed_types']        = 'jpeg|jpg|png';
            $config['max_size']             = 5000;
            $config['overwrite']            = true;
            $config['allowed_types'] = 'jpeg|jpg|png';
            $config['file_name'] = $file;


            // Load and initialize upload library 
            $this->load->library('upload', $config);
            $this->upload->initialize($config);

            // Upload file to server 
            if ($this->upload->do_upload('file')) {
               $message .= ('Gambar Berhasil Dikirim <br>');
            } else {
               $message .= $this->upload->display_errors() . "<br>";
            }
         }
         $this->session->set_flashdata('message', $this->flash_info($message));
      } else {
         $this->session->set_flashdata('message', $this->flash_success("Review Berhasil Dikirim"));
      }
      $data = array('nama' => $name, 'tanggal_review' => $timestamp, 'judul_review' => $title, 'isi_review' => $review, 'gambar' => $folder);
      $this->m_home->m_add_review($data);
      redirect('home/review');
      $this->session->set_flashdata('message', '');
   }



   //Upload File
   public function ubah_info_harga()
   {
      if ($this->session->userdata('is_login') == FALSE || $this->session->userdata('id_pks') != "0") {
         redirect('user/', 'refresh');
      } else {
         $title['page_title'] = "Ubah Informasi Harga";
         $this->load->view('header.php', $title);
         $this->load->view('user/admin_header.php');
         $this->load->view('user/info_harga.php', array('image' => $this->m_user->m_get_banner()));
         $this->load->view('main/footer.php');
      }
   }



   //Addon Function
   private function filter_input($input)
   {
      $search = array(
         '@<script[^>]*?>.*?</script>@si', // Menghapus script tag
         '@<[ /!]*?[^<>]*?>@si', // Menghapus tag HTML
         '@<style[^>]*?>.*?</style>@siU', // Menghapus style tag
         '/`/', "/'/", '/"/'
      );
      $output = preg_replace($search, '', $input);
      $output = htmlspecialchars($output, ENT_QUOTES, 'UTF-8');
      return $output;
   }


   private function getTimestamp()
   {
      $locale = 'id_ID';
      $dateObj = new DateTime;
      $formatter = new IntlDateFormatter(
         $locale,
         IntlDateFormatter::FULL,
         IntlDateFormatter::SHORT
      );
      $formatter->format($dateObj);
      $cDate = $formatter->format($dateObj);
      return substr($cDate, 0, -6) . " pukul " . substr($cDate, -5) . " WIB";
   }
   private function flash_success($message)
   {
      return "
        toastMixin.fire({
        icon: 'success',
        animation: true,
        title: '" . $message . "'
        });";
   }
   private function flash_info($message)
   {
      return "
        toastMixin.fire({
        icon: 'info',
        animation: true,
        title: '" . $message . "'
        });";
   }
   private function flash_error($message)
   {
      return "
        toastMixin.fire({
        icon: 'error',
        animation: true,
        title: '" . $message . "'
        });";
   }
}
