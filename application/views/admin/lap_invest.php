<section id="lap_invest" class="pt-4 section-bg">
    <div class="container-fluid ">
        <div class="section-title mt-5 ">
            <h2>progress lap. investasi</h2>
        </div>

        <div style="width: 100%;" >
            <table style="table-layout: fixed;width:100%" id="tabel_lap_invest" class="table table-hover table-bordered w-100">
                <div class="row justify-content-end">


                    <?php $tw = "50em";
                    $month_array = array('Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des');
                    ?>

                </div>
                <thead class="mainbgc text-light mt-2">
                    <th style="width:1em">No.</th>
                    <th style="min-width:30rem">Uraian Pekerjaan</th>
                    <th style="width:1em">PKS</th>
                    <th style="width:1em;display:none;">Progress</th>
                    <th style='width:13em'>Dokumen</th>
                    <th style="max-width:30em">
                        <div onscroll="$('.tbs').scrollLeft($(this).scrollLeft())" class="table-responsive b-scroll" style="width:100%">
                            <table class="text-light tbw">
                                <tbody>
                                    <tr>
                                        <?php

                                        foreach ($month_array as $key => $value) {
                                            $ma = $key + 1;
                                            for ($ia = 1; $ia < 5; $ia++) {
                                                echo "<td style='white-space:nowrap ;' class='w$ia-m$ma'><div style='width:60px; margin-left:2px'>W$ia $value</div></td>";
                                            }
                                        } ?>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </th>
                </thead>

                <tbody>
                    <?php
                    $pks = $this->db->query("select singkatan from daftar_nama_pks where id_pks>0")->result_array();
                    $a_prg = array('PKS', 'TEKPOL', 'HPS', 'PENGADAAN', 'SPPBJ');
                    $type_color = '';
                    for ($i = 0; $i < 5; $i++) {
                        $num = $i + 1;
                        $pkss = $pks[$i]['singkatan'];
                        $prg = array_rand($a_prg, 1);
                        switch ($prg) {
                            case 0:
                                $type_color = "text-dark";
                                break;
                            case 1:
                                $type_color = "text-danger";
                                break;
                            case 2:
                                $type_color = "text-orange";
                                break;
                            case 3:
                                $type_color = "text-warning";
                                break;
                            case 4:
                                $type_color = "text-main";
                                break;
                        }
                        $prgs = $a_prg[$prg];
                        echo "<tr>
                    <td>$num</td>
                    <td class='$type_color'>pekerjaan di pekerjaan di pekerjaan di pekerjaan di pekerjaan di pekerjaan di pekerjaan di pekerjaan di pekerjaan di </td>
                    <td class='$type_color'>$pkss</td>
                    <td class='d-none'>$prgs</td>
                    <td >
                        <div class='row justify-content-evenly '>
                            
                                <button class='col-3 btn mainbgc text-light p-1 m-1'>RAB</button>
                            
                                <button class='col-3 btn mainbgc text-light p-1 m-1'>RKST</button>
                            
                                <button class='col-3 btn mainbgc text-light p-1 m-1'><small>Kontrak</small></button>
                        </div>
                    </td>
                        <td  >
                       
                        <div style='width:100%;overflow-x:hidden' class='tbs'>
                            <table class='tbw' class='table table-bordered'>
                        
                        ";




                        echo " 
                                <tbody>
                                
                                ";

                        foreach ($month_array as $key => $value) {
                            $base = base_url('media/upload/surat/SE-Penetapan-6-Standarisasi-PMT_page-0002.jpg');
                            $m = $key + 1;

                            for ($iz = 1; $iz < 5; $iz++) {
                                $rnd = random_int(1, 100);
                                echo "<td style='white-space:nowrap;text-align:center' class='w$iz-m$m curpo'><div style='width:60px; margin-left:2px'><a href='$base' data-gallery='portfolioGallery' class='portfolio-lightbox preview-link text-start ps-0' title='Surat Edaran 2'>$rnd%
                                </a></div></td>";
                            }
                        }

                        echo "
                                </tbody>
                            </table>
                        </div>
                        </td>
                    
                </tr>";
                    }

                    ?>
                </tbody>
            </table>


        </div>
    </div>
</section>



<script>
    let tabel_lap_invest = $('#tabel_lap_invest').DataTable({
        columnDefs: [{
            targets: [4, 5],
            orderable: false
        }],
        pageLength: 25
    });

    let filtertype = `<div id="filter_type" class="form-inline float-start me-4 pe-3">
            <span class="ms-2 text-dark"><label for="pks" ><input onchange="filterType()" style="transform:translateY(25%);" type="checkbox" checked name="" value="pks" id="pks" class="form-check curpo d-inline"><small class="me-1 ms-1">PKS</small></label></span>
            <span class="ms-2 text-danger"><label for="tekpol" ><input onchange="filterType()" style="transform:translateY(25%);" type="checkbox" checked name="" value="tekpol" id="tekpol" class="form-check curpo d-inline"><small class="me-1 ms-1">TEKPOL</small></label></span>
            <span class="ms-2 text-orange"><label for="hps" ><input onchange="filterType()" style="transform:translateY(25%);" type="checkbox" checked name="" value="hps" id="hps" class="form-check curpo d-inline"><small class="me-1 ms-1">HPS</small></label></span>
            <span class="ms-2 text-warning"><label for="pengadaan" ><input onchange="filterType()" style="transform:translateY(25%);" type="checkbox" checked name="" value="pengadaan" id="pengadaan" class="form-check curpo d-inline"><small class="me-1 ms-1">PENGD</small></label></span>
            <span class="ms-2 text-main"><label for="sppbj" ><input onchange="filterType()" style="transform:translateY(25%);" type="checkbox" checked name="" value="sppbj" id="sppbj" class="form-check curpo d-inline"><small class="me-1 ms-1">SPPBJ</small></label></span>
            <span class="ms-2 me-2" onclick="$(this).parent().find('input:checkbox').prop('checked',true);filterType()"><i class="text-secondary bi bi-bootstrap-reboot curpo"></i></span>
        </div> `


    let filtertime = `<div class="d-inline">
                <span class="ms-2">From:</span>
                <label class="mb-3" for="flt_weekfrom">
                    <select value="1" onchange='filterTime()' class="form-select" name="" id="flt_weekfrom">
                        <option selected value="1">W1</option>
                        <option value="2">W2</option>
                        <option value="3">W3</option>
                        <option value="4">W4</option>
                    </select>
                </label>
                <label class="ms-1" for="">
                    <select val="1" onchange='filterTime()' class="form-select" name="" id="flt_monthfrom">
                        <option selected value="1">Jan</option>
                        <option value="2">Feb</option>
                        <option value="3">Mar</option>
                        <option value="4">Apr</option>
                        <option value="5">Mei</option>
                        <option value="6">Jun</option>
                        <option value="7">Jul</option>
                        <option value="8">Agu</option>
                        <option value="9">Sep</option>
                        <option value="10">Okt</option>
                        <option value="11">Nov</option>
                        <option value="12">Des</option>
                    </select>
                </label>
                <span class="ms-2">To:</span>
                <label class="mb-3" for="flt_weekto">
                    <select value="4" onchange='filterTime()' class="form-select" name="" id="flt_weekto">
                        <option value="1">W1</option>
                        <option value="2">W2</option>
                        <option value="3">W3</option>
                        <option selected value="4">W4</option>
                    </select>
                </label>

                <label class="float-end ms-1" for="">
                    <select val="12" onchange='filterTime()' class="form-select" name="" id="flt_monthto">
                        <option value="1">Jan</option>
                        <option value="2">Feb</option>
                        <option value="3">Mar</option>
                        <option value="4">Apr</option>
                        <option value="5">Mei</option>
                        <option value="6">Jun</option>
                        <option value="7">Jul</option>
                        <option value="8">Agu</option>
                        <option value="9">Sep</option>
                        <option value="10">Okt</option>
                        <option value="11">Nov</option>
                        <option selected value="12">Des</option>
                    </select>
                </label>
            </div>`

    $(document).ready(function() {

        setTimeout(() => {
            $('#tabel_lap_invest_filter').append(filtertype);
            $('#tabel_lap_invest_filter').append(filtertime);
        }, 100);
    });


    function filterType() {
        let filter_value = $('#filter_type input:checked').map(function() {
            return $(this).val();
        }).get()
        let res = ""
        for (let index = 0; index < filter_value.length; index++) {
            if (filter_value.length == (index + 1)) {
                res += filter_value[index];
            } else {
                res += filter_value[index] + "|";
            }
        }
        console.log(res)
        tabel_lap_invest.columns(3).search(`${res}`, true, false).draw();
    }

    function filterTime() {
        let weekfrom = parseInt($('#flt_weekfrom').val())
        let weekto = parseInt($('#flt_weekto').val())
        let monthfrom = parseInt($('#flt_monthfrom').val())
        let monthto = parseInt($('#flt_monthto').val())


        if (monthfrom > monthto) {
            let tmp = monthfrom
            monthfrom = monthto
            monthto = tmp
        } else if (monthfrom == monthto) {
            if (weekfrom > weekto) {
                let tmp = weekfrom
                weekfrom = weekto
                weekto = tmp
            }
        }

        let x = weekfrom
        $(`.tbw td`).hide()
        for (monthfrom; monthfrom <= monthto; monthfrom++) {
            if (monthfrom < monthto) {
                for (x; x <= 4; x++) {
                    let mw = ("w" + x + "-m" + monthfrom)
                    $(`.tbw td.${mw}`).show();
                }
                x = 1;
            } else if (monthfrom == monthto) {
                if (weekfrom != weekto) {
                    x = 1;
                } else {
                    x = weekfrom;
                }
                for (x; x <= weekto; x++) {
                    let mw = ("w" + x + "-m" + monthfrom)
                    $(`.tbw td.${mw}`).show();
                }
            }
        }
    }
</script>