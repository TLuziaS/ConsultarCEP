jQuery(function () {

    //Tarefa
    function onlyNumbers() {

        this.value = this.value.replace(/\D/g, "");

    }

    function validateEntry() {

        if (this.value.length != CEP_SIZE) {

            $(this).addClass("error");

        } else {

            $(this).removeClass("error");

            getAddress(this.value);
        }

    }

    function getAddress(cep) {
       
        $.ajax({

            url: `https://viacep.com.br/ws/${cep}/json`,
            datatype: "json",
            error: getAddressError,
            success: getAddressSuccess

        })

    }

    function getAddressError() {
       
        $("#msgError").remove();

        $("<p>").attr("id", "msgError").text("Falha na Comunicação").prependTo("form");
        
    }

    function getAddressSuccess(address) {

        let { logradouro } = address;
        $("#logradouro").val(logradouro);

        let { bairro } = address;
        $("#bairro").val(bairro);

        let { localidade } = address;
        $("#cidade").val(localidade);

        let { uf } = address;
        $("#estado").val(uf);

    }


    //UI
    
    const CEP_SIZE = 8;

    $("#cep").attr("maxlength", CEP_SIZE)
        .on("input", onlyNumbers) // Evento, Função
        .on("focusout", validateEntry);

});
