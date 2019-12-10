/*JQuery Wrapper
jQuery(function(){}) Criou o sistema dele e inseriu para executar uma função, ou seja, é um callback(Funções que chegam como parametros)*/

jQuery(function () {

    //action ou tarefa
    function onlyNumbers() {
        //g = busca global
        //replace("O que deve ser trocado", "Trocar por")

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
        // Criar um pop-up centralizado --- Lição de Casa
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