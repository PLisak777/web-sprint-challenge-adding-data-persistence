exports.up = function (knex) {
	return knex.schema
		.createTable('projects', (tbl) => {
			tbl.increments();
			tbl.string('name').notNullable();
			tbl.string('description');
			tbl.boolean('completed').defaultTo(false).notNullable();
		})

		.createTable('resources', (tbl) => {
			tbl.increments();
			tbl.string('name').notNullable().unique();
			tbl.string('description');
		})

		.createTable('tasks', (tbl) => {
			tbl.increments();
			tbl.string('description').notNullable();
			tbl.string('notes');
			tbl.boolean('completed').defaultTo(false).notNullable();
			tbl
				.integer('projectId')
				.notNullable()
				.unsigned()
				.references('id')
				.inTable('projects')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
		})

		.createTable('projects_resources', (tbl) => {
			tbl.increments();
			tbl
				.integer('projectId')
				.notNullable()
				.unsigned()
				.references('id')
				.inTable('projects')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			tbl
				.integer('resourceId')
				.notNullable()
				.unsigned()
				.references('id')
				.inTable('resources')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists('projects_resources')
		.dropTableIfExists('tasks')
		.dropTableIfExists('resources')
		.dropTableIfExists('projects');
};
