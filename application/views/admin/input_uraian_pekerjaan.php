<link rel="stylesheet" href="<?= base_url("assets/vendor/selectize/css/selectize.css") ?>">
<section id="input_uraian_pekerjaan">
    <div class="container mt-3">
        <div class="section-title">
            <h2>Input Uraian Pekerjaan</h2>
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
                            Input Uraian Pekerjaan
                        </td>
                        <td>
                            <textarea name="uraian_pekerjaan" rows="5" cols="5" class="form-control w-100" placeholder="Uraian Pekerjaan..."></textarea>
                        </td>
                    </tr>
                </tbody>
                
            </table>
            <button class="btn mainbgc text-light float-end fw-bold" type="submit">Kirim</button>
        </form>
    </div>
</section>
<script>
    $(document).ready(function() {
        $('#list_pks').selectize();
    });
</script>