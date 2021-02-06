POSTGRES_CONTAINER?=postgres

reset_db:
	$(MAKE) clean_db
	$(MAKE) init_db
	# $(MAKE) populate_mongo
	$(MAKE) populate_db

clean_db:
	docker exec -u postgres:postgres ${POSTGRES_CONTAINER} psql -d app -f /fixtures/sql/schema-drop.pgsql

init_db:
	docker exec -u postgres:postgres ${POSTGRES_CONTAINER} psql -d app -f /fixtures/sql/schema.pgsql

populate_db:
	# $(MAKE) populate_db_sql
	$(MAKE) populate_db_js

populate_db_sql:
	docker exec -u postgres:postgres ${POSTGRES_CONTAINER} psql -d app -f /fixtures/sql/data.pgsql

populate_db_js:
	# id=docker inspect --format="{{.Id}}" fdaservice-next_app
	docker exec app node ./fixtures/js/fixtures.js

populate_mongo:
	docker exec mongo_fdaservice_next mongorestore --dir /dump/fdaservice-planesciences --drop -d fdaservice

npi:
	docker exec -it app bash