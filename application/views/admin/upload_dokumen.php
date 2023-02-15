<link rel="stylesheet" href="<?= base_url("assets/vendor/selectize/css/selectize.css") ?>">
<section id="upload_dokumen" class="section_bg">
    <div class="container mt-3">
        <div class="section-title">
            <h2> Upload Dokumen</h2>
        </div>
        <form action="<?= base_url('index.php/') ?>admin/tambah_pekerjaan" method="post" enctype="multipart/form-data">
            <table class="table table-bordered table-hover rounded">
                <tbody>
                    <tr>
                        <td style="width:30%">
                            Pilih PKS
                        </td>
                        <td class="control-group">
                            <select name="id_pks" id="list_pks" required>
                                <option disabled selected value="">Pilih PKS</option>
                                <?php for ($i = 0; $i < count($data_pks); $i++) {
                                    echo ' <option class="curpo" value=' . $data_pks[$i]['id_pks'] . '>' . $data_pks[$i]['nama_pks'] . '</option>';
                                }
                                ?>

                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style="width:30%">
                            Pilih Uraian Pekerjaan
                        </td>
                        <td class="control-group">
                            <select onchange="$('#u_p').text($(this).children('option').filter(':selected').text());" name="id_pekerjaan" id="list_pekerjaan" class="" required>
                                <option disabled selected value="">Pilih Uraian Pekerjaan</option>
                                <?php for ($i = 0; $i < count($data_pekerjaan); $i++) {
                                    echo ' <option class="curpo" value=' . $data_pekerjaan[$i]['id_pekerjaan'] . '>' . $data_pekerjaan[$i]['pekerjaan'] . '</option>';
                                }
                                ?>

                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style="width:30%">
                            RAB<span class="text-danger">*</span>
                        </td>
                        <td>
                            <input class="form-control" type="file" name="surat_1" id="" placeholder="Surat 1" accept=".pdf" required>
                            <?php echo form_error('surat_1', '<p class="text-danger">', '</p>'); ?>
                        </td>
                    </tr>
                    <tr>
                        <td style="width:30%">
                            Spesifikasi Teknis/RKST/KAK<span class="text-danger">*</span>
                        </td>
                        <td>
                            <input class="form-control" type="file" name="surat_1" id="" placeholder="Surat 1" accept=".pdf" required>
                            <?php echo form_error('surat_1', '<p class="text-danger">', '</p>'); ?>
                        </td>
                    </tr>
                    <tr>
                        <td style="width:30%">
                            Kontrak<span class="text-danger">*</span>
                        </td>
                        <td>
                            <input class="form-control" type="file" name="surat_1" id="" placeholder="Surat 1" accept=".pdf" required>
                            <?php echo form_error('surat_1', '<p class="text-danger">', '</p>'); ?>
                        </td>
                    </tr>
                </tbody>

            </table>
            <p class="mt-2"><span class="text-danger">*</span>Hanya menerima dokumen dengan format .pdf dan ukuran maks. 5MB</p>
            <div class="row justify-content-end">
                <div class="col-3 col-lg-1 ">
                    <button class="btn mainbgc text-light fw-bold" type="submit">Kirim</button>
                </div>

            </div>

    </div>

    </form>
    </div>
</section>
<script>
    $('#list_pks').selectize();
    $('#list_pekerjaan').selectize();
</script>