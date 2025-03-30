const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const constMessage = require("../constant/message");

const TenantExists = {
    validate: async (values, helpers) => {
        
        for (const value of values) {
            const userId = parseInt(value, 10);
            // Check if the value exists in the tenant table's userId field
            const existingTenant = await prisma.tenant.findFirst({
              where: {
                userId: userId, // Assuming `userId` is the field in the `tenant` table
              },
            });
      
            // If a match is found, return an error message
            if (existingTenant) {
              return helpers.message(constMessage.ALREADY_EXIST.replace(":name", `User ID ${value}`));
            }
          }

    return values;
  }
};

module.exports = TenantExists;