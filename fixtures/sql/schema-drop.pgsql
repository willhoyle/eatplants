-- This script will delete everything created in `schema.sql`. This script is
-- also idempotent, you can run it as many times as you would like. Nothing
-- will be dropped if the schemas and roles do not exist.
begin;

drop schema if exists app, app_private cascade;

drop role if exists user_anonymous, user_basic, user_super;

commit;

