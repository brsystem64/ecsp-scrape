# csp-core
CSP faz raspagem de dados no site da policia do estado de São Paulo, utilizando tecnicas
de web scraping, formata os dados e salva na base de dados.

OBS: O projeto serve apenas para fins de aprendizagem.

## Como usar?
Para usar o csp é necessário realizar algumas configurações.

Utilize o script `create-db.sql` para criar o banco de dados(Mariadb/Mysql).

Copie o arquivo `.env.example` e renomeie para `.env` apenas. Preencha os campos de acordo com sua base de dados.


#### Opcional
Para visualizar o Scrape sendo executado, altere o atributo `headless` para **false** no  `src/config/properties.json`


### Executando
Após as configurações, basta rodar o seguinte codigo
``` 
    npm start {cidade} {ano} {busca}
``` 
   Exemplos:
   ```
        npm start aparecida 2020 ocorrencias
        npm start "sao jose dos campos" 2020 ocorrencias
   ```
Algumas regras nos parametros devem ser avaliadas:

- Não é necessário de acentos nos nomes das cidades.
- Cidades com nome composto, deve-se usar aspas.
- O ano minimo da busca é 2001, e o máximo o ano atual.
- O tipo de busca podem ser dois:
  - ocorrencias
  - produtividade



----


## Como funciona?
O CSP é dividido em 4 partes.

### 1. Validação
Quando o CSP é iniciado, é necessário que sejam passado três argumentos referentes a busca.
- O nome da cidade
- O ano
- Tipo de busca(ocorrencias  mensais ou produtividade policial)

Os argumentos são validados e passados para a próxima etapa.

### 2. Raspage
A classe Scrape é onde toda a raspagem de dados ocorre, utilizando do framework pupperteer.
Quando essa classe é instanciada, os argumentos referidos anteriormente são passado como
parametros Os filtros são aplicados resultando na geração de uma tabela, na qual é feita a extração das naturezas e suas respectivas informações.

### 3. Filtragem e Formatação
Após a coleta da tabela algumas informações indesejada são retiradas(como a soma de alguns tipos de crimes, criando uma categoria desnecessária para nós). Após a filtragem as informações que restaram são formatadas e enviadas a camada de persistencia.

### 4. Persistencia
Caso os dados na qual foram submetidos a coleta já estejam salvos na base de dados, esses
são atualizados, e os novos inseridos.



