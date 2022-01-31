function helpFn(){
    console.log(`
    Your entered command is wrong check from below ones

    node <file> <command> <folder> <argument>
    node mycli view "F:\FJP_ENG\file_system_organizer\activity\commands\help.js" tree;
    node mycli view "F:\FJP_ENG\file_system_organizer\activity\commands\help.js" flat;

    node mycli help;
    `);
}

module.exports = {
    help: helpFn
}