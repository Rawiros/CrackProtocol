// This packet was 12

export default class UnlockRecipes {
    name = "unlock_recipes";
    normalized_name = "UnlockRecipes";
    data = {"action":0,"craftingBookOpen":false,"filteringCraftable":false,"smeltingBookOpen":false,"filteringSmeltable":false,"blastFurnaceOpen":false,"filteringBlastFurnace":false,"smokerBookOpen":false,"filteringSmoker":false,"recipes1":[],"recipes2":[]};
    cancelled?: boolean;
    
    setAction(value: (typeof this.data)['action']) { this.data['action'] = value; return this };
    setCraftingbookopen(value: (typeof this.data)['craftingBookOpen']) { this.data['craftingBookOpen'] = value; return this };
    setFilteringcraftable(value: (typeof this.data)['filteringCraftable']) { this.data['filteringCraftable'] = value; return this };
    setSmeltingbookopen(value: (typeof this.data)['smeltingBookOpen']) { this.data['smeltingBookOpen'] = value; return this };
    setFilteringsmeltable(value: (typeof this.data)['filteringSmeltable']) { this.data['filteringSmeltable'] = value; return this };
    setBlastfurnaceopen(value: (typeof this.data)['blastFurnaceOpen']) { this.data['blastFurnaceOpen'] = value; return this };
    setFilteringblastfurnace(value: (typeof this.data)['filteringBlastFurnace']) { this.data['filteringBlastFurnace'] = value; return this };
    setSmokerbookopen(value: (typeof this.data)['smokerBookOpen']) { this.data['smokerBookOpen'] = value; return this };
    setFilteringsmoker(value: (typeof this.data)['filteringSmoker']) { this.data['filteringSmoker'] = value; return this };
    setRecipes1(value: (typeof this.data)['recipes1']) { this.data['recipes1'] = value; return this };
    setRecipes2(value: (typeof this.data)['recipes2']) { this.data['recipes2'] = value; return this };
};