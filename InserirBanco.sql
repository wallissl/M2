create table vacinas (
    id serial primary key,
    nome varchar (30) not null,
    descricao varchar (200) not null,
    dose int not null
);