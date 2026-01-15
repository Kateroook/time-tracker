const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


async function createEntry({ date, project, hours, description }) {
  await checkDailyLimit(date, hours);
  const entry = await prisma.timeEntry.create({
    data: { date, project, hours, description },
  });
  return entry;
}

async function getEntries() {
  return prisma.timeEntry.findMany({
    orderBy: { date: "desc" },
  });
}

// Update entry
async function updateEntry(id, description) {
  const entry = await prisma.timeEntry.update({
    where: { id },
    data: { description },
  });
  return entry;
}

// Delete entry
async function deleteEntry(id) {
  const existing = await prisma.timeEntry.findUnique({ where: { id: Number(id) } });
  if (!existing) throw new Error("Entry not found");

  return prisma.timeEntry.delete({ where: { id: Number(id) } });
}

// Helper: enforce 24-hour/day limit
async function checkDailyLimit(date, hours, ignoreId = null) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const totalForDay = await prisma.timeEntry.aggregate({
    where: {
      date: { gte: start, lte: end },
      ...(ignoreId ? { id: { not: ignoreId } } : {}),
    },
    _sum: { hours: true },
  });

  if ((totalForDay._sum.hours ?? 0) + hours > 24) {
    throw new Error("Total hours per day cannot exceed 24");
  }
}

module.exports = { createEntry, getEntries, updateEntry, deleteEntry };