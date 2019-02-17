export default {
  "fullName":
    { "type": "text"
    , "label": "Nome completo"
    , "placeholder": "Nome completo"
    , "validation": "required"
    , "value": ""
    },
  "nationality":
    { "type": "select"
    , "label": "Nacionalidade (s)"
    , "placeholder": "Nacionalidade"
    , "validation": "required"
    , "value": ""
    , "displayBy": "label"
    , "trackBy": "value"
    , "options":
        [ { "label": "Brasileiro (a)", "value": "brasileiro" }
        , { "label": "Britânico (a)", "value": "britanico" }
        , { "label": "Argentino (a)", "value": "argentino" }
        ]
    },
  "federationUnit":
    { "type": "select"
    , "label": "UF Natal"
    , "placeholder": "UF Natal"
    , "validation": "required"
    , "value": ""
    , "displayBy": "label"
    , "trackBy": "value"
    , "options":
        [ { "label": "Birmingham", "value": "birmingham" }
        , { "label": "São Paulo", "value": "são paulo" }
        ]
    },
  "city":
    { "type": "text"
    , "label": "Cidade Natal"
    , "placeholder": "Cidade Natal"
    , "validation": "required"
    , "value": ""
    },
  "ethinicity":
    { "type": "select"
    , "label": "Cor/Raça"
    , "placeholder": "Cor/Raça"
    , "validation": "required"
    , "value": ""
    , "displayBy": "label"
    , "trackBy": "value"
    , "options":
        [ { "label": "Branco (a)", "value": "branco" }
        , { "label": "Negro (a)", "value": "negro" }
        , { "label": "Amarelo (a)", "value": "amarelo" }
        , { "label": "Vermelho (a)", "value": "vermelho" }
        ]
    },
  "gender":
    { "type": "select"
    , "label": "Gênero"
    , "placeholder": "Gênero"
    , "validation": "required"
    , "value": ""
    , "displayBy": "label"
    , "trackBy": "value"
    , "options":
        [ { "label": "Masculino", "value": "masculino" }
        , { "label": "Feminino", "value": "feminino" }
        , { "label": "Outro", "value": "outro" }
        ]
    },
  "maritalStatus":
    { "type": "select"
    , "label": "Estado Civil"
    , "placeholder": "Estado Civil"
    , "validation": "required"
    , "value": ""
    , "displayBy": "label"
    , "trackBy": "value"
    , "options":
        [ { "label": "Casado (a)", "value": "casado" }
        , { "label": "Solteiro (a)", "value": "solteiro" }
        , { "label": "Viúvo (a)", "value": "viuvo" }
        ]
    },
  "birthday":
    { "type": "text"
    , "label": "Data de nascimento"
    , "placeholder": "Data de nascimento"
    , "mask": "##/##/####"
    , "validation": "required|dateFormat"
    , "value": ""
    },
  "motherName":
    { "type": "text"
    , "label": "Nome da mâe"
    , "placeholder": "Nome da mâe"
    , "validation": ""
    , "value": ""
    },
  "fatherName":
    { "type": "text"
    , "label": "Nome do pai"
    , "placeholder": "Nome do pai"
    , "validation": ""
    , "value": ""
    },
    "dinamicValidation":
      { "type": "text"
      , "label": "This field's validation changes according to the rest of the form"
      , "placeholder": "Crazy field"
      , "validation": (formData) => (formData.testField || '').length ? 'required' : ''
      , "value": "I'm crazy"
      }
}