POSTGRES_CONTAINER?=postgres_eatplants
DATABASE_URL=postgres://eatplants:password123@localhost:33333/eatplants

reset_db:
	$(MAKE) clean_db
	$(MAKE) init_db
	$(MAKE) populate_db

psql:
	docker exec -it ${POSTGRES_CONTAINER} psql -U eatplants -d eatplants

clean_db:
	docker exec ${POSTGRES_CONTAINER} psql -U eatplants -d eatplants -f /fixtures/sql/schema-drop.pgsql

init_db:
	docker exec ${POSTGRES_CONTAINER} psql -U eatplants -d eatplants -f /fixtures/sql/schema.pgsql

populate_db:
	docker exec ${POSTGRES_CONTAINER} psql -U eatplants -d eatplants -f /fixtures/sql/import-csv.pgsql

start_graphql:
	postgraphile \
		--subscriptions \
		--watch \
		--dynamic-json \
		--no-setof-functions-contain-nulls \
		--show-error-stack=json \
		--extended-errors hint,detail,errcode \
		--append-plugins @graphile-contrib/pg-simplify-inflector \
		--export-schema-graphql schema.graphql \
		--graphiql "/" \
		--enhance-graphiql \
		--allow-explain \
		--enable-query-batching \
		--legacy-relations omit \
		--connection ${DATABASE_URL} \
		--schema app
	#	--no-ignore-rbac \
	# --no-ignore-indexes \