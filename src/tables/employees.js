module.exports = (table) => {
    table.increments('id')
    .primary()

    table.string('name')

    table.integer('userId')

    table.timestamp('created_at')
}