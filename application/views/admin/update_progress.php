<link rel="stylesheet" href="<?= base_url("assets/vendor/selectize/css/selectize.css") ?>">
<section id="input_uraian_pekerjaan">
    <div class="container mt-3">
        <div class="section-title">
            <h2> Update Progress Pengadaan</h2>
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
                            <select  onchange="$('#u_p').text($(this).children('option').filter(':selected').text());" name="id_pekerjaan" id="list_pekerjaan" class="" required>
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
                            Update Progress Pengadaan
                        </td>
                        <td>
                            <select name="id_progress" id="" class="form-select" required>
                                <option disabled selected value="">Pilih </option>
                                <?php for ($i = 0; $i < count($data_progress); $i++) {
                                    echo ' <option class="curpo" value=' . $data_progress[$i]['id_progress'] . '>' . $data_progress[$i]['nama_progress'] . '</option>';
                                }
                                ?>

                            </select>
                        </td>
                    </tr>
                    <tr id="koreksi" class="d-none">
                        <td style="width:30%">
                            Uraian Pekerjaan
                        </td>
                        <td>
                            <textarea id="u_p" name="uraian_pekerjaan" rows="5" cols="5" class="form-control w-100" placeholder="Uraian Pekerjaan..."></textarea>
                        </td>
                    </tr>
                </tbody>

            </table>
            <div class="row justify-content-end">

                <div class="col-3 col-lg-1 ">
                    <button class="btn btn-danger text-light  fw-bold" type="submit">Hapus</button>
                </div>
                <div class="col-3 col-lg-1 me-2">
                    <button onclick="$('#koreksi').removeClass('d-none')" class="btn btn-warning text-light fw-bold" type="button">Koreksi</button>
                </div>
                <div class="col-3 col-lg-1 ">
                    <button class="btn mainbgc text-light fw-bold" type="submit">Kirim</button>
                </div>

            </div>

    </div>

    </form>
    </div>
</section>
<script>
    $(document).ready(function() {
        $('#list_pks').selectize();
        $('#list_pekerjaan').selectize();
    });
</script>